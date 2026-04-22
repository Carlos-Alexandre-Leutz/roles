<template>
  <section class="mx-auto p-4">
    <h3 class="text-xl font-bold font-headline mb-6 text-white">
      Convites de Pendentes
    </h3>

    <div v-if="loading" class="text-center py-10 text-neutral-500">
      Carregando convites...
    </div>

    <div v-else class="space-y-6">
      <div v-if="receivedList.length > 0" class="space-y-4">
        <p
          class="text-xs font-bold text-primary uppercase tracking-widest ml-2"
        >
          Recebidos
        </p>
        <div
          v-for="req in receivedList"
          :key="req.id"
          class="glass-panel p-5 rounded-3xl border border-primary/20 bg-primary/5 flex flex-wrap items-center justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <img
              :src="
                req.senderPhoto ||
                `https://ui-avatars.com/api/?name=${req.targetName}`
              "
              class="w-12 h-12 rounded-2xl bg-surface-container object-cover"
            />
            <div>
              <h4 class="font-bold text-on-surface leading-none">
                {{ req.targetName }}
              </h4>
              <p class="text-xs text-primary mt-1">Quer ser seu amigo(a)</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleAccept(req.id)"
              class="px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-bold shadow-[0_0_15px_rgba(219,144,255,0.3)] hover:scale-105 transition-transform"
            >
              Aceitar
            </button>
            <button
              class="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant text-sm font-bold hover:bg-surface-container-highest transition-colors"
            >
              Recusar
            </button>
          </div>
        </div>
      </div>

      <div v-if="sentList.length > 0" class="space-y-4">
        <p
          class="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-2"
        >
          Enviados por você
        </p>
        <div
          v-for="req in sentList"
          :key="req.id"
          class="glass-panel p-5 rounded-3xl border border-outline-variant/10 flex flex-wrap items-center justify-between gap-4 opacity-70"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center"
            >
              <img
                :src="
                  req.senderPhoto ||
                  `https://ui-avatars.com/api/?name=${req.targetName}`
                "
                class="w-12 h-12 rounded-2xl bg-surface-container object-cover"
              />
            </div>
            <div>
              <h4 class="font-bold text-on-surface leading-none">
                Aguardando resposta de
                {{ req.targetName }}
              </h4>
              <p class="text-xs text-on-surface-variant mt-1">
                Convite enviado
              </p>
            </div>
          </div>
          <button
            class="px-5 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant text-sm font-bold hover:border-error hover:text-error transition-all"
          >
            Cancelar
          </button>
        </div>
      </div>

      <div
        v-if="receivedList.length === 0 && sentList.length === 0"
        class="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/20"
      >
        <span class="material-symbols-outlined text-5xl text-neutral-700 mb-2"
          >group_off</span
        >
        <p class="text-neutral-500">Nenhuma solicitação pendente no momento.</p>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { friendService } from "@/services/friends/friendService";
import { userService } from "@/services/users/userService";

const receivedList = ref([]);
const sentList = ref([]);
const loading = ref(true);

async function loadRequests() {
  loading.value = true;
  try {
    const receivedRaw = await friendService.getIncomingRequests();
    const sentRaw = await friendService.getMySentRequests();

    receivedList.value = await Promise.all(
      receivedRaw.map(async (req) => {
        const name = await userService.getName(req.requestedBy);
        return { ...req, targetName: name };
      })
    );

    sentList.value = await Promise.all(
      sentRaw.map(async (req) => {
        const targetId = req.participants.find((id) => id !== req.requestedBy);
        const name = await userService.getName(targetId);
        return { ...req, targetName: name };
      })
    );
  } catch (error) {
    console.error("Erro ao carregar convites:", error);
  } finally {
    loading.value = false;
  }
}

const handleAccept = async (friendshipId) => {
  try {
    const res = await friendService.acceptFriendRequest(friendshipId);

    if (res.success) {
      await loadRequests();
    }
  } catch (error) {
    alert("Não foi possível aceitar a amizade agora.");
  }
};

onMounted(() => {
  loadRequests();
});
</script>