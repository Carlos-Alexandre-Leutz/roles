import { db } from '../firebase';
import { authGuard } from '../authGuard.ts';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

export const userService = {
  async getUser() {
    return await authGuard.ensureAuth();
  },
  async saveUserProfile() {
    const user = await authGuard.ensureAuth();
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      try {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName.toLowerCase(),
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (e) {
        console.error("Erro ao salvar perfil:", e);
      }
    }
  },
  async searchUsers(nameQuery: string) {
    try {
      const user = await authGuard.ensureAuth();
      const searchTerm = nameQuery.toLowerCase().trim();
      if (!searchTerm) return [];

      const q = query(
        collection(db, "users"),
        where("displayName", ">=", searchTerm),
        where("displayName", "<=", searchTerm + '\uf8ff'),
        limit(20)
      );

      const snap = await getDocs(q);
      const users = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((u: any) => u.uid !== user.uid);

      return users;
    } catch (e) {
      console.error("Erro na busca global:", e);
      return [];
    }
  },
  async getName(userId: string) {
    try {
      if (!userId) return "Usuário desconhecido";

      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        return this.formatName(userData.displayName);
      } else {
        console.warn(`Usuário com ID ${userId} não encontrado.`);
        return "Usuário não encontrado";
      }
    } catch (e) {
      console.error("Erro ao buscar nome do usuário:", e);
      return "Erro ao carregar nome";
    }
  },
  async getUsersByIds(uids: string[]) {
    if (!uids || uids.length === 0) return [];

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "in", uids));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data(),
        name: doc.data().displayName || "Usuário"
      }));
    } catch (e) {
      console.error("Erro ao buscar lote de usuários:", e);
      return [];
    }
  },
  formatName(name: string) {
    if (!name) return '';
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
};