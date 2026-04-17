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
  async createRole(roleData: any) {
    try {
      const user = await authGuard.ensureAuth();
      const docRef = await addDoc(collection(db, "roles"), {
        title: roleData.title,
        description: roleData.description,
        userId: user.uid,
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

      const q = query(collection(db, "roles"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (e) {
      console.error("Erro ao buscar roles:", e);
      //jerar um log detalhado para o erro em uma tela para mim olhar se ta dando erro ou não
      throw e;
    }
  }
};