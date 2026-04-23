import { db } from "../firebase.ts";
import { authGuard } from "../authGuard.ts";
import { userService } from "@/services/users/userService.ts"
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
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
    } catch (e) {
      console.error("Erro ao responder ao role:", e);
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
          status: p.status
        };
      });

      return {
        id: docSnap.id,
        ...roleData,
        participants: hydratedParticipants
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
};