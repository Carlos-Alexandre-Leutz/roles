import { db } from "../firebase.ts";
import { authGuard } from "../authGuard.ts";
import { userService } from "@/services/users/userService.ts"
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
} from "firebase/firestore";

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
        participants: participants,
        createdAt: serverTimestamp()
      });

      return docRef.id;
    } catch (e) {
      console.error("Erro ao salvar role:", e);
      throw e;
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
  async addItemToRole(roleId: number, itemData: any) {
    try {
      const roleRef = doc(db, "roles", roleId);

      const newItem = {
        id: Date.now(),
        name: itemData.name,
        price: parseFloat(itemData.price),
        responsibleId: itemData.responsibleId,
        responsibleName: itemData.responsibleName,
        isDone: false,
        createdAt: new Date().toISOString()
      };

      await updateDoc(roleRef, {
        items: arrayUnion(newItem)
      });

      return true;
    } catch (e) {
      console.error("Erro ao adicionar item:", e);
      return false;
    }
  },
  async toggleItemStatus(roleId: string, itemId: number, isDone: boolean) {

    try {
      const roleRef = doc(db, "roles", roleId);
      const roleSnap = await getDoc(roleRef);

      if (!roleSnap.exists()) {
        throw new Error("Role não encontrado");
      }

      const data = roleSnap.data();
      const items = Array.isArray(data.items) ? data.items : [];

      const updatedItems = items.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, isDone: isDone };
        }
        return item;
      });

      await updateDoc(roleRef, {
        items: updatedItems
      });

      return true;
    } catch (e) {
      console.error("Erro ao atualizar status do item:", e);
      return false;
    }
  },
  async deleteItemFromRole(roleId: string, itemId: number) {
    try {
      const roleRef = doc(db, "roles", roleId);
      const roleSnap = await getDoc(roleRef);

      if (!roleSnap.exists()) return false;

      const items = roleSnap.data().items || [];

      const updatedItems = items.filter((item: any) => item.id !== itemId);

      await updateDoc(roleRef, { items: updatedItems });
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

      const roleRef = doc(db, "roles", roleId);
      const roleSnap = await getDoc(roleRef);

      if (roleSnap.exists()) {
        const data = roleSnap.data();

        const updatedItems = data.items.map(i => {
          if (i.id === item.id) {
            return {
              ...i,
              responsibleId: user.uid,
              responsibleName: user.displayName || 'Convidado'
            };
          }
          return i;
        });

        await updateDoc(roleRef, { items: updatedItems });

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