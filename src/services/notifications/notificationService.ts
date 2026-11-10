import { db } from "../firebase.ts";
import { authGuard } from "../authGuard.ts";
import { emailService } from "./emailService.ts";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";

export type NotificationType =
  | "role_invite"
  | "role_response"
  | "item_assigned"
  | "item_taken"
  | "payment"
  | "chat_message"
  | "friend_request"
  | "friend_accepted";

export interface NotificationInput {
  type: NotificationType;
  title: string;
  body: string;
  roleId?: string | null;
}

export const notificationService = {
  async notify(userId: string | null | undefined, data: NotificationInput) {
    try {
      const me = await authGuard.ensureAuth();
      if (!userId || userId === me.uid) return;

      await addDoc(collection(db, "notifications"), {
        userId,
        type: data.type,
        title: data.title,
        body: data.body,
        roleId: data.roleId || null,
        read: false,
        createdAt: serverTimestamp(),
      });

      await this.sendEmail(userId, data);
    } catch (e) {
      console.error("Erro ao criar notificação:", e);
    }
  },
  async sendEmail(userId: string, data: NotificationInput) {
    try {
      const snap = await getDoc(doc(db, "users", userId));
      const profile = snap.data();
      if (!profile?.email || profile.emailVerified !== true || profile.emailNotifications === false) return;

      const base = `${window.location.origin}${import.meta.env.BASE_URL}#`;
      const link = data.roleId
        ? `${base}/view-role/${data.roleId}`
        : data.type.startsWith("friend")
          ? `${base}/friends`
          : `${base}/dashboard`;

      await emailService.send(
        profile.email,
        `Roles: ${data.title}`,
        `${data.body}\n\nAbrir no app: ${link}`
      );
    } catch (e) {
      console.error("Erro ao preparar e-mail:", e);
    }
  },
  async notifyMany(userIds: string[], data: NotificationInput) {
    await Promise.all(userIds.map((id) => this.notify(id, data)));
  },
  subscribe(callback: (list: any[]) => void) {
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;

    authGuard.ensureAuth().then((user) => {
      if (cancelled) return;
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid)
      );
      unsubscribe = onSnapshot(
        q,
        (snap) => {
          const list = snap.docs
            .map((d) => {
              const data = d.data({ serverTimestamps: "estimate" });
              return {
                id: d.id,
                ...data,
                createdAt: data.createdAt?.toDate?.() || new Date(),
              };
            })
            .sort((a: any, b: any) => b.createdAt - a.createdAt)
            .slice(0, 30);
          callback(list);
        },
        (e) => console.error("Erro ao ouvir notificações:", e)
      );
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  },
  async markRead(id: string) {
    try {
      await updateDoc(doc(db, "notifications", id), { read: true });
    } catch (e) {
      console.error("Erro ao marcar notificação:", e);
    }
  },
  async markAllRead(ids: string[]) {
    try {
      const batch = writeBatch(db);
      ids.forEach((id) => batch.update(doc(db, "notifications", id), { read: true }));
      await batch.commit();
    } catch (e) {
      console.error("Erro ao marcar notificações:", e);
    }
  },
};
