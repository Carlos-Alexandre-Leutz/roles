import { db, auth } from '../firebase';
import { updateProfile, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { authGuard } from '../authGuard.ts';
import store from "@/store";
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
  updateDoc,
} from "firebase/firestore";

export const userService = {
  async getUser() {
    const user = await authGuard.ensureAuth();
    if (user) {
      store.commit('SET_USER_ID', user.uid);
    }
    return user;
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
          emailVerified: false,
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
  async getMyProfile() {
    const user = await authGuard.ensureAuth();
    const snap = await getDoc(doc(db, "users", user.uid));
    return {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      pixKey: "",
      ...(snap.exists() ? snap.data() : {}),
    } as any;
  },
  async updateMyProfile(data: { displayName: string; photoURL: string; pixKey: string; emailNotifications: boolean }) {
    const user = await authGuard.ensureAuth();
    const displayName = data.displayName.trim();
    if (!displayName) throw new Error("Nome é obrigatório");

    await updateProfile(auth.currentUser || user, { displayName });
    await updateDoc(doc(db, "users", user.uid), {
      displayName: displayName.toLowerCase(),
      photoURL: data.photoURL,
      pixKey: data.pixKey.trim(),
      emailNotifications: data.emailNotifications,
      updatedAt: serverTimestamp(),
    });
  },
  resizeImage(file: File, size = 256): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) return reject(new Error("Arquivo não é imagem"));
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(
          img,
          (img.width - side) / 2,
          (img.height - side) / 2,
          side,
          side,
          0,
          0,
          size,
          size
        );
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Não foi possível ler a imagem"));
      };
      img.src = url;
    });
  },
  async syncEmailVerified() {
    const user = await authGuard.ensureAuth();
    await user.reload();
    const verified = auth.currentUser?.emailVerified === true;
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists() && snap.data().emailVerified !== verified) {
      await updateDoc(ref, { emailVerified: verified });
    }
    return verified;
  },
  async sendVerificationEmail() {
    const user = await authGuard.ensureAuth();
    await sendEmailVerification(auth.currentUser || user);
  },
  async sendPasswordReset() {
    const user = await authGuard.ensureAuth();
    if (!user.email) throw new Error("Conta sem e-mail");
    await sendPasswordResetEmail(auth, user.email);
    return user.email;
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