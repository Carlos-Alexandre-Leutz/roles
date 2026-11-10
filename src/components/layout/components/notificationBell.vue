<template>
  <div class="relative">
    <button
      @click="open = !open"
      class="relative text-on-surface-variant hover:text-white transition-colors p-2"
      title="Notificações"
    >
      <span class="material-symbols-outlined">notifications</span>
      <span
        v-if="unreadCount"
        class="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary-container text-[10px] font-bold flex items-center justify-center"
      >
        {{ unreadCount > 9 ? "9+" : unreadCount }}
      </span>
    </button>
    <div v-if="open" class="fixed inset-0 z-40" @click="open = false"></div>
    <div
      v-if="open"
      class="fixed left-4 right-4 top-[4.5rem] sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-80 z-50 rounded-2xl bg-[#1c1b1b] border border-outline-variant/20 shadow-2xl overflow-hidden"
    >
      <div
        class="flex items-center justify-between px-4 py-3 border-b border-outline-variant/10"
      >
        <p class="text-white font-bold text-sm">Notificações</p>
        <button
          v-if="unreadCount"
          @click="readAll"
          class="text-xs text-primary hover:underline"
        >
          Marcar todas como lidas
        </button>
      </div>
      <div class="max-h-96 overflow-y-auto">
        <p
          v-if="!notifications.length"
          class="p-6 text-center text-sm text-on-surface-variant"
        >
          Nada por aqui ainda.
        </p>
        <button
          v-for="n in notifications"
          :key="n.id"
          @click="openNotification(n)"
          class="w-full text-left px-4 py-3 flex gap-3 hover:bg-white/5 transition-colors border-b border-outline-variant/5"
        >
          <span
            class="material-symbols-outlined text-primary mt-0.5"
            :class="n.read ? 'opacity-40' : ''"
            >{{ iconFor(n.type) }}</span
          >
          <div class="min-w-0 flex-1">
            <p
              class="text-sm"
              :class="n.read ? 'text-on-surface-variant' : 'text-white font-bold'"
            >
              {{ n.title }}
            </p>
            <p class="text-xs text-on-surface-variant break-words">
              {{ n.body }}
            </p>
            <p class="text-[10px] text-on-surface-variant/60 mt-1">
              {{ formatWhen(n.createdAt) }}
            </p>
          </div>
          <span
            v-if="!n.read"
            class="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { notificationService } from "@/services/notifications/notificationService";

const router = useRouter();
const open = ref(false);
const notifications = ref([]);
let unsubscribe = null;

const unreadCount = computed(
  () => notifications.value.filter((n) => !n.read).length
);

const icons = {
  role_invite: "celebration",
  role_response: "how_to_reg",
  item_assigned: "assignment_ind",
  item_taken: "pan_tool",
  payment: "payments",
  chat_message: "chat",
  friend_request: "person_add",
  friend_accepted: "group",
};
const iconFor = (type) => icons[type] || "notifications";

const formatWhen = (date) =>
  date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

async function openNotification(n) {
  if (!n.read) notificationService.markRead(n.id);
  open.value = false;
  if (n.roleId) router.push(`/view-role/${n.roleId}`);
  else if (n.type.startsWith("friend")) router.push("/friends");
}

function readAll() {
  notificationService.markAllRead(
    notifications.value.filter((n) => !n.read).map((n) => n.id)
  );
}

onMounted(() => {
  unsubscribe = notificationService.subscribe((list) => {
    notifications.value = list;
  });
});
onBeforeUnmount(() => unsubscribe?.());
</script>
