import { auth } from './firebase.ts';
import { onAuthStateChanged } from "firebase/auth";

export const authGuard = {
  ensureAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          window.location.href = '/login';
          reject("Usuário não autenticado. Redirecionando...");
        }
      });
    });
  }
};