import { db } from "../firebase.ts";
import { authGuard } from "../authGuard.ts";
import { userService } from "@/services/users/userService.ts"
import { notificationService } from "@/services/notifications/notificationService.ts"
import Swal from 'sweetalert2';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
  onSnapshot,
  orderBy,
  runTransaction,
} from "firebase/firestore";

async function updateItems(roleId: string, mutate: (items: any[]) => any[]) {
  const roleRef = doc(db, "roles", roleId);
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(roleRef);
    if (!snap.exists()) throw new Error("Role não encontrado");
    const items = Array.isArray(snap.data().items) ? snap.data().items : [];
    tx.update(roleRef, { items: mutate(items) });
  });
}

const myName = (user: any) =>
  userService.formatName(user?.displayName) || "Alguém";

export const roleService = {
  async createRole(roleData: any, friendsIds: string[] = []) {
    try {
      const user = await authGuard.ensureAuth();

      const participants = friendsIds.map(id => ({
        uid: id,
        status: 'pending'
      }));

      participants.push({
        uid: user.uid,
        status: 'confirmed'
      });

      const docRef = await addDoc(collection(db, "roles"), {
        title: roleData.title,
        ownerId: user.uid,
        address: roleData.address,
        eventDateTime: roleData.eventDateTime,
        cover: roleData.cover || null,
        participants: participants,
        createdAt: serverTimestamp()
      });

      await notificationService.notifyMany(friendsIds, {
        type: "role_invite",
        title: "Novo rolê!",
        body: `${myName(user)} te convidou para "${roleData.title}"`,
        roleId: docRef.id,
      });

      return docRef.id;
    } catch (e) {
      console.error("Erro ao salvar role:", e);
      throw e;
    }
  },
  async getInvitePreview(roleId: string) {
    try {
      const user = await authGuard.ensureAuth();
      const snap = await getDoc(doc(db, "roles", roleId));
      if (!snap.exists()) return null;
      const role = snap.data();
      const alreadyIn =
        role.ownerId === user.uid ||
        (role.participants || []).some((p: any) => p.uid === user.uid);
      return { role, alreadyIn };
    } catch (e) {
      console.error("Erro ao abrir convite:", e);
      return null;
    }
  },
  async joinViaInvite(roleId: string) {
    try {
      const user = await authGuard.ensureAuth();
      const roleRef = doc(db, "roles", roleId);
      await updateDoc(roleRef, {
        participants: arrayUnion({ uid: user.uid, status: "confirmed" }),
      });
      const snap = await getDoc(roleRef);
      await notificationService.notify(snap.data()?.ownerId, {
        type: "role_response",
        title: "Presença confirmada",
        body: `${myName(user)} entrou pelo link em "${snap.data()?.title || "seu rolê"}"`,
        roleId,
      });
      return true;
    } catch (e) {
      console.error("Erro ao entrar pelo convite:", e);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível entrar no rolê.",
        icon: "error",
        background: "#1e293b",
        color: "#f8fafc",
      });
      return false;
    }
  },
  async respondToRole(roleId: string, status: 'confirmed' | 'declined') {
    try {
      const user = await authGuard.ensureAuth();
      const roleRef = doc(db, "roles", roleId);
      const roleSnap = await getDoc(roleRef);

      if (!roleSnap.exists()) throw new Error("Role não encontrado");

      const participants = roleSnap.data().participants;

      const updatedParticipants = participants.map((p: any) => {
        if (p.uid === user.uid) {
          return { ...p, status: status };
        }
        return p;
      });

      await updateDoc(roleRef, { participants: updatedParticipants });

      await notificationService.notify(roleSnap.data().ownerId, {
        type: "role_response",
        title: status === "confirmed" ? "Presença confirmada" : "Convite recusado",
        body: `${myName(user)} ${status === "confirmed" ? "vai" : "não vai"} em "${roleSnap.data().title}"`,
        roleId,
      });

      if (status === 'confirmed') {
        Swal.fire({
          title: 'Presença Confirmada!',
          text: 'Você agora faz parte deste Role.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#1e293b',
          color: '#f8fafc'
        });
      } else {
        Swal.fire({
          title: 'Convite Recusado',
          text: 'O evento não aparecerá mais na sua agenda.',
          icon: 'info',
          timer: 2000,
          showConfirmButton: false,
          background: '#1e293b',
          color: '#f8fafc'
        });
      }
      return true;

    } catch (e) {
      console.error("Erro ao responder ao role:", e);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível salvar sua resposta.',
        icon: 'error',
        confirmButtonColor: '#3b82f6'
      });
      return false;
    }
  },
  async getMyRoles() {
    try {
      const user = await authGuard.ensureAuth();
      const myId = user.uid;

      const statuses = ['confirmed', 'pending', 'declined'];

      const promises = statuses.map(status => {
        const q = query(
          collection(db, "roles"),
          where("participants", "array-contains", { uid: myId, status: status })
        );
        return getDocs(q);
      });

      const results = await Promise.all(promises);
      const allDocs = results.flatMap(snapshot => snapshot.docs);

      const roles = allDocs.map(doc => {
        const data = doc.data();

        const myParticipation = data.participants?.find((p: any) => p.uid === myId);

        return {
          id: doc.id,
          title: data.title,
          ownerId: data.ownerId,
          myStatus: myParticipation?.status || 'pending',
          eventDateTime: data.eventDateTime,
        };
      });

      return roles;

    } catch (e) {
      console.error("Erro ao buscar roles:", e);
      throw e;
    }
  },
  async getRoleById(roleId: string) {
    try {
      const user = await authGuard.ensureAuth();
      const docRef = doc(db, "roles", roleId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return null;

      const roleData = docSnap.data();

      const participantsRaw = roleData.participants || [];
      const uids = participantsRaw.map((p: any) => p.uid);

      const profiles = await userService.getUsersByIds(uids);

      const hydratedParticipants = participantsRaw.map((p: any) => {
        const userProfile = profiles.find(u => u.uid === p.uid);
        return {
          ...userProfile,
          status: p.status,
        };
      });

      return {
        id: docSnap.id,
        ...roleData,
        participants: hydratedParticipants,
        userId: user.uid

      };
    } catch (e) {
      console.error("Erro no getRoleById:", e);
      throw e;
    }
  },
  async canEditRole(roleId: string) {
    try {
      const user = await authGuard.ensureAuth();
      const roleRef = doc(db, "roles", roleId);
      const roleSnap = await getDoc(roleRef);

      if (!roleSnap.exists()) {
        throw new Error("Role não encontrado");
      }

      const roleData = roleSnap.data();

      return roleData.ownerId === user.uid;
    } catch (e) {
      return false;
    }
  },
  async getMyStatusInRole(roleId: string) {
    try {
      const user = await authGuard.ensureAuth();
      const roleRef = doc(db, "roles", roleId);
      const roleSnap = await getDoc(roleRef);

      if (!roleSnap.exists()) return null;

      const roleData = roleSnap.data();
      const participants = roleData.participants || [];

      const myParticipation = participants.find((p: any) => p.uid === user.uid);
      return myParticipation ? myParticipation.status : null;

    } catch (e) {
      console.error("Erro ao buscar status no role:", e);
      return null;
    }
  },
  async addItemToRole(roleId: string, itemData: any) {
    try {
      const roleRef = doc(db, "roles", roleId);

      const newItem = {
        id: Date.now(),
        name: itemData.name,
        price: Number(itemData.price) || 0,
        responsibleId: itemData.responsibleId,
        responsibleName: itemData.responsibleName,
        isDone: false,
        createdAt: new Date().toISOString()
      };

      await updateDoc(roleRef, {
        items: arrayUnion(newItem)
      });

      if (itemData.responsibleId) {
        const me = await authGuard.ensureAuth();
        await notificationService.notify(itemData.responsibleId, {
          type: "item_assigned",
          title: "Você tem uma tarefa",
          body: `${myName(me)} te escalou para levar: ${itemData.name}`,
          roleId,
        });
      }

      return true;
    } catch (e) {
      console.error("Erro ao adicionar item:", e);
      return false;
    }
  },
  async toggleItemStatus(roleId: string, itemId: number, isDone: boolean) {
    try {
      await updateItems(roleId, (items) =>
        items.map((item) => (item.id === itemId ? { ...item, isDone } : item))
      );
      return true;
    } catch (e) {
      console.error("Erro ao atualizar status do item:", e);
      return false;
    }
  },
  async deleteItemFromRole(roleId: string, itemId: number) {
    try {
      await updateItems(roleId, (items) =>
        items.filter((item) => item.id !== itemId)
      );
      return true;
    } catch (e) {
      console.error("Erro ao deletar item:", e);
      return false;
    }
  },
  async deleteRole(roleId: string) {
    try {
      const roleRef = doc(db, "roles", roleId);
      await deleteDoc(roleRef);
      return true;
    } catch (e) {
      console.error("Erro ao deletar role:", e);
      throw e;
    }
  },
  async updateRole(id: string, data: any,) {
    const roleRef = doc(db, "roles", id);
    return await updateDoc(roleRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },
  async abandonItem(roleId: string, itemId: number) {
    try {
      const user = await authGuard.ensureAuth();
      await updateItems(roleId, (items) =>
        items.map((i) =>
          i.id === itemId && i.responsibleId === user.uid
            ? { ...i, responsibleId: null, responsibleName: "Pode ser você =)", isDone: false }
            : i
        )
      );
      return true;
    } catch (e) {
      console.error("Erro ao abandonar item:", e);
      return false;
    }
  },
  async updateItemPrice(roleId: string, itemId: number, price: number) {
    try {
      await updateItems(roleId, (items) =>
        items.map((i) =>
          i.id === itemId ? { ...i, price: Number(price) || 0 } : i
        )
      );
      return true;
    } catch (e) {
      console.error("Erro ao atualizar preço:", e);
      return false;
    }
  },
  async addSettlement(roleId: string, from: string, to: string, amount: number) {
    try {
      await updateDoc(doc(db, "roles", roleId), {
        settlements: arrayUnion({
          id: Date.now(),
          from,
          to,
          amount: Math.round(amount * 100) / 100,
          createdAt: new Date().toISOString(),
        }),
      });

      const me = await authGuard.ensureAuth();
      const other = me.uid === from ? to : from;
      const value = amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
      await notificationService.notify(other, {
        type: "payment",
        title: "Pagamento registrado",
        body:
          me.uid === from
            ? `${myName(me)} informou que te pagou R$ ${value}`
            : `${myName(me)} confirmou que recebeu R$ ${value}`,
        roleId,
      });
      return true;
    } catch (e) {
      console.error("Erro ao registrar pagamento:", e);
      return false;
    }
  },
  subscribeToMessages(roleId: string, callback: (messages: any[]) => void) {
    const q = query(
      collection(db, "roles", roleId, "messages"),
      orderBy("createdAt", "asc")
    );
    return onSnapshot(
      q,
      (snap) => {
        callback(
          snap.docs.map((d) => {
            const data = d.data({ serverTimestamps: "estimate" });
            return {
              id: d.id,
              senderId: data.senderId,
              text: data.text,
              createdAt: data.createdAt?.toDate?.() || new Date(),
            };
          })
        );
      },
      (e) => console.error("Erro ao ouvir mensagens:", e)
    );
  },
  async notifyChatMessage(roleId: string, user: any, text: string) {
    try {
      const key = `chatNotify:${roleId}`;
      const last = Number(localStorage.getItem(key) || 0);
      if (Date.now() - last < 10 * 60 * 1000) return;

      const roleSnap = await getDoc(doc(db, "roles", roleId));
      if (!roleSnap.exists()) return;
      const role = roleSnap.data();
      const recipients = (role.participants || [])
        .filter((p: any) => p.uid !== user.uid && p.status !== "declined")
        .map((p: any) => p.uid);
      if (!recipients.length) return;

      localStorage.setItem(key, String(Date.now()));
      await notificationService.notifyMany(recipients, {
        type: "chat_message",
        title: `Nova mensagem em "${role.title}"`,
        body: `${myName(user)}: ${text.slice(0, 80)}`,
        roleId,
      });
    } catch (e) {
      console.error("Erro ao notificar mensagem:", e);
    }
  },
  async sendMessage(roleId: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return false;
    try {
      const user = await authGuard.ensureAuth();
      await addDoc(collection(db, "roles", roleId, "messages"), {
        senderId: user.uid,
        text: trimmed.slice(0, 1000),
        createdAt: serverTimestamp(),
      });

      await this.notifyChatMessage(roleId, user, trimmed);
      return true;
    } catch (e) {
      console.error("Erro ao enviar mensagem:", e);
      return false;
    }
  },
  async volunteerForItem(roleId: string, item: any) {
    try {
      const user = await authGuard.ensureAuth();

      const result = await Swal.fire({
        title: 'Assumir tarefa?',
        text: `Você quer ser o responsável por: ${item.name}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, eu cuido!',
        cancelButtonText: 'Cancelar',
        background: "#1e293b",
        color: "#f8fafc",
        confirmButtonColor: "#db90ff",
        cancelButtonColor: "#475569",
      });

      if (!result.isConfirmed) return null;

      {
        await updateItems(roleId, (items) =>
          items.map((i) =>
            i.id === item.id && !i.responsibleId
              ? {
                  ...i,
                  responsibleId: user.uid,
                  responsibleName: user.displayName || 'Convidado'
                }
              : i
          )
        );

        const roleSnap = await getDoc(doc(db, "roles", roleId));
        await notificationService.notify(roleSnap.data()?.ownerId, {
          type: "item_taken",
          title: "Tarefa assumida",
          body: `${myName(user)} vai levar: ${item.name}`,
          roleId,
        });

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Você assumiu a tarefa!',
          showConfirmButton: false,
          timer: 2000,
          background: "#1e293b",
          color: "#f8fafc",
        });

        return {
          responsibleId: user.uid,
          responsibleName: user.displayName || 'Convidado'
        };
      }
    } catch (error) {
      console.error("Erro no processo de voluntariado:", error);
      return null;
    }
  },
  async addFriendsByUid(roleId: string, uids: string[]) {
    const result = await Swal.fire({
      title: 'Enviar convites?',
      text: `Você está convidando ${uids.length} ${uids.length === 1 ? 'amigo' : 'amigos'} para o rolê.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, enviar!',
      cancelButtonText: 'Cancelar',
      background: "#1e293b",
      color: "#f8fafc",
      confirmButtonColor: "#db90ff",
    });

    if (!result.isConfirmed) return false;

    try {
      const roleRef = doc(db, "roles", roleId);

      const newParticipants = uids.map(id => ({
        uid: id,
        status: 'pending'
      }));

      await updateDoc(roleRef, {
        participants: arrayUnion(...newParticipants)
      });

      const me = await authGuard.ensureAuth();
      const roleSnap = await getDoc(roleRef);
      await notificationService.notifyMany(uids, {
        type: "role_invite",
        title: "Novo rolê!",
        body: `${myName(me)} te convidou para "${roleSnap.data()?.title || "um rolê"}"`,
        roleId,
      });

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Convites enviados!',
        showConfirmButton: false,
        timer: 2000,
        background: "#1e293b",
        color: "#f8fafc",
      });

      return true;
    } catch (error) {
      console.error("Erro ao convidar amigos:", error);
      Swal.fire({
        title: "Erro",
        text: "Não conseguimos salvar os convites.",
        icon: "error",
        background: "#1e293b",
        color: "#f8fafc",
      });
      return false;
    }
  },
  async removeParticipantByUid(roleId: string, targetUid: string) {
    const result = await Swal.fire({
      title: 'Remover amigo?',
      text: "Ele não terá mais acesso a este rolê.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar',
      background: "#1e293b",
      color: "#f8fafc",
      confirmButtonColor: "#f87171",
    });

    if (!result.isConfirmed) return false;

    try {
      const roleRef = doc(db, "roles", roleId);
      const roleSnap = await getDoc(roleRef);

      if (roleSnap.exists()) {
        const participants = roleSnap.data().participants || [];

        const participantObject = participants.find(p => p.uid === targetUid);

        if (participantObject) {
          await updateDoc(roleRef, {
            participants: arrayRemove(participantObject)
          });

          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Removido!',
            showConfirmButton: false,
            timer: 2000,
            background: "#1e293b",
            color: "#f8fafc",
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Erro ao remover participante:", error);
      return false;
    }
  }
};