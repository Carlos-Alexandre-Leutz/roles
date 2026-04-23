import { db } from '../firebase';
import { authGuard } from '../authGuard.ts';
import { userService } from '../users/userService.ts';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";

export const friendService = {
  async sendFriendRequest(toId: string) {

    const from = await authGuard.ensureAuth();

    try {
      const q = query(
        collection(db, "friendships"),
        where("participants", "array-contains", from.uid)
      );

      const querySnapshot = await getDocs(q);

      const alreadyExists = querySnapshot.docs.some(doc => {
        const data = doc.data();
        return data.participants.includes(toId);
      });

      if (alreadyExists) {
        console.warn("Já existe uma solicitação ou amizade entre vocês.");
        return { success: false, message: "Já existe um vínculo pendente ou ativo." };
      }

      await addDoc(collection(db, "friendships"), {
        participants: [from.uid, toId],
        requestedBy: from.uid,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      return { success: true };
    } catch (e) {
      console.error("Erro ao enviar solicitação:", e);
      throw e;
    }
  },
  async getMySentRequests() {
    const user = await authGuard.ensureAuth();
    const q = query(
      collection(db, "friendships"),
      where("requestedBy", "==", user.uid),
      where("status", "==", "pending")
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data());
  },

  async getIncomingRequests() {
    const user = await authGuard.ensureAuth();
    const myId = user.uid;

    const q = query(
      collection(db, "friendships"),
      where("participants", "array-contains", myId),
      where("status", "==", "pending")
    );

    const snap = await getDocs(q);

    return snap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((req: any) => req.requestedBy !== myId);
  },

  async acceptFriendRequest(friendshipId: string) {
    try {
      const friendshipRef = doc(db, "friendships", friendshipId);

      await updateDoc(friendshipRef, {
        status: 'accepted',
        acceptedAt: serverTimestamp()
      });

      return { success: true };
    } catch (e) {
      console.error("Erro ao aceitar amizade no Service:", e);
      return { success: false, error: e };
    }
  },

  async getMyFriends() {
    try {
      const user = await authGuard.ensureAuth();
      const myId = user.uid;

      const q = query(
        collection(db, "friendships"),
        where("participants", "array-contains", myId),
        where("status", "==", "accepted")
      );

      const snap = await getDocs(q);

      if (snap.empty) return [];

      const friendshipsData = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          friendId: data.participants.find((id: string) => id !== myId)
        };
      });

      const allFriendIds = friendshipsData.map(f => f.friendId);

      const friendsProfiles = await userService.getUsersByIds(allFriendIds);

      const friends = friendshipsData.map(friendship => {
        const profile = friendsProfiles.find(p => p.uid === friendship.friendId);

        return {
          ...friendship,
          friendName: profile?.displayName || "Usuário desconhecido",
          friendPhoto: profile?.photoURL || null
        };
      });

      return friends;

    } catch (e) {
      console.error("Erro ao buscar amigos no Service:", e);
      return [];
    }
  },
};