import { db } from '../firebase.ts';
import { authGuard } from '../authGuard.ts';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

export const roleService = {
  async createRole(roleData: any, friendsIds: string[] = []) {
    try {
      const user = await authGuard.ensureAuth();
      const allParticipants = [user.uid, ...friendsIds];

      const docRef = await addDoc(collection(db, "roles"), {
        title: roleData.title,
        description: roleData.description,
        ownerId: user.uid,
        participants: allParticipants,
        createdAt: serverTimestamp()
      });

      return docRef.id;
    } catch (e) {
      console.error("Erro ao salvar role:", e);
      throw e;
    }
  },

  async getMyRoles() {
    try {
      const user = await authGuard.ensureAuth();
      const myId = user.uid;

      const q = query(
        collection(db, "roles"),
        where("participants", "array-contains", myId)
      );

      const querySnapshot = await getDocs(q);

      console.log(`✅ Roles encontrados onde você participa: ${querySnapshot.size}`);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (e) {
      console.error("Erro ao buscar roles por participantes:", e);
      throw e;
    }
  }
};