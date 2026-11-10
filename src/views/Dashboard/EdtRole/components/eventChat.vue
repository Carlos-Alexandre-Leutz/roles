<template>
  <div
    class="glass-panel flex flex-col h-[70vh] lg:h-[calc(100vh-10rem)] rounded-[2rem] border border-outline-variant/10 overflow-hidden"
  >
    <div class="p-6 border-b border-outline-variant/10 bg-[#201f1f]/50">
      <div class="flex items-center gap-3">
        <div class="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        <h3 class="text-xl font-headline font-bold text-white">
          Chat do Evento
        </h3>
      </div>
      <p class="text-xs text-on-surface-variant mt-1">Coordenação e Zoeira</p>
    </div>
    <div ref="listEl" class="flex-1 overflow-y-auto p-6 space-y-6">
      <p
        v-if="!messages.length"
        class="text-sm text-on-surface-variant text-center"
      >
        Nenhuma mensagem ainda. Puxe o assunto!
      </p>
      <div
        v-for="m in messages"
        :key="m.id"
        class="flex gap-3"
        :class="m.senderId === userId ? 'flex-row-reverse' : ''"
      >
        <img
          v-if="m.senderId !== userId && photoOf(m.senderId)"
          alt="Avatar"
          class="w-8 h-8 rounded-full self-end object-cover"
          :src="photoOf(m.senderId)"
        />
        <div
          v-else-if="m.senderId !== userId"
          class="w-8 h-8 rounded-full self-end bg-primary/20 text-primary flex items-center justify-center text-xs font-bold uppercase"
        >
          {{ nameOf(m.senderId).charAt(0) }}
        </div>
        <div class="max-w-[80%]">
          <p
            class="text-[10px] text-on-surface-variant mb-1"
            :class="m.senderId === userId ? 'mr-2 text-right' : 'ml-2'"
          >
            {{ m.senderId === userId ? "Você" : nameOf(m.senderId) }} •
            {{ formatTime(m.createdAt) }}
          </p>
          <div
            class="p-4 rounded-2xl text-sm break-words whitespace-pre-wrap"
            :class="
              m.senderId === userId
                ? 'bg-primary/20 rounded-br-none text-white border border-primary/20'
                : 'bg-surface-container-high rounded-bl-none text-on-secondary-container'
            "
          >
            {{ m.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-6 bg-surface-container">
      <form class="relative flex items-center" @submit.prevent="send">
        <input
          v-model="draft"
          maxlength="1000"
          class="w-full bg-surface-container-highest border-none rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
          placeholder="Escreva uma mensagem..."
          type="text"
        />
        <button
          type="submit"
          :disabled="!draft.trim() || sending"
          class="absolute right-3 w-10 h-10 bg-primary text-on-primary-container rounded-xl flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50"
        >
          <span class="material-symbols-outlined text-sm">send</span>
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import { roleService } from "@/services/roles/roleService";
import { userService } from "@/services/users/userService";

const props = defineProps({
  roleId: { type: String, default: "" },
  userId: { type: String, default: "" },
  participants: { type: Array, default: () => [] },
});

const messages = ref([]);
const draft = ref("");
const sending = ref(false);
const listEl = ref(null);
let unsubscribe = null;

const person = (uid) => props.participants.find((p) => p.uid === uid);
const nameOf = (uid) =>
  userService.formatName(person(uid)?.displayName) || "Alguém";
const photoOf = (uid) => person(uid)?.photoURL || "";

const formatTime = (date) =>
  date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

const scrollToEnd = async () => {
  await nextTick();
  if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight;
};

async function send() {
  if (!draft.value.trim() || sending.value) return;
  sending.value = true;
  const text = draft.value;
  draft.value = "";
  const ok = await roleService.sendMessage(props.roleId, text);
  if (!ok) draft.value = text;
  sending.value = false;
}

watch(messages, scrollToEnd);

onMounted(() => {
  if (props.roleId) {
    unsubscribe = roleService.subscribeToMessages(props.roleId, (list) => {
      messages.value = list;
    });
  }
});

onBeforeUnmount(() => unsubscribe?.());
</script>
