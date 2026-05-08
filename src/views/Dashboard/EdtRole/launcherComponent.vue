<template>
  <div class="font-body selection:bg-primary/30">
    <main class="min-h-screen bg-surface">
      <div class="max-w-[1400px] mx-auto p-8 lg:p-12">
        <section class="mb-12 relative rounded-[2.5rem] overflow-hidden group">
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"
          ></div>
          <div class="h-80 w-full overflow-hidden">
            <img
              alt="Brazilian BBQ"
              class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              data-alt="juicy pieces of seasoned meat grilling on a charcoal barbecue with glowing embers and soft smoke in a festive night setting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc8yq26Evu21Te1JWJhNvPcZ9rNiW8WFbm1AqbrjgWYA8vZhgH2uiuDQPRrxIEPZ4Be3Zo87LnoPC_Wzlz_PkDdPTUnDQ1Km00HtWiMLzgGBEglw0JqZVfu_lRsYN-F6uw629xsC8yYNhmcmd-Yd6kL-wLu6MxNoVVv8rPZwAePDvXn0nTz6nffAXgdkQqL9WCUm1ouqXvxt-nmAzZ_08dINnJu_4mypv2PbXx6QxhFxLm-KOzfChdJKFUNGHRmUfCyY6J64cV1OVB"
            />
          </div>
          <div
            class="absolute bottom-0 left-0 p-10 z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2
                class="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-white mb-2"
              >
                {{ currentRole?.title || "Carregando..." }}
              </h2>
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="bg-primary/20 backdrop-blur-md text-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-primary/20"
                >
                  <span class="material-symbols-outlined text-base">
                    calendar_today
                    {{ formatEventDate(currentRole?.eventDateTime) }}
                  </span>
                </span>
              </div>
              <div class="flex items-center gap-2 text-on-surface-variant">
                <span class="material-symbols-outlined text-primary"
                  >location_on</span
                >
                <span class="text-lg first-letter:uppercase lowercase">
                  {{ currentRole?.address }}
                </span>
              </div>
            </div>
            <div class="flex gap-4">
              <template v-if="!isOwner">
                <button
                  @click="handleAccept"
                  class="flex items-center gap-2 px-8 py-4 bg-emerald-500/20 backdrop-blur-xl rounded-full font-bold border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all"
                >
                  <span class="material-symbols-outlined text-emerald-400"
                    >check_circle</span
                  >
                  {{ isConfirmed ? "Convite Aceito" : "Aceitar Convite" }}
                </button>
                <button
                  @click="handleDeclined"
                  class="flex items-center gap-2 px-8 py-4 bg-red-500/10 backdrop-blur-xl rounded-full font-bold border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <span class="material-symbols-outlined text-red-400">
                    cancel
                  </span>
                  {{ isDeclined ? "Convite Recusado" : "Recusar Convite" }}
                </button>
              </template>
              <template v-if="isOwner">
                <button
                  class="flex items-center gap-2 px-8 py-4 bg-surface-container-highest/60 backdrop-blur-xl rounded-full font-bold border border-outline-variant/20 hover:bg-surface-container-highest transition-all"
                >
                  <span class="material-symbols-outlined">share</span>
                  Convidar
                </button>
                <router-link
                  :to="{
                    name: 'edit-role',
                    params: { id: roleId },
                  }"
                >
                  <button
                    class="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                  >
                    <span class="material-symbols-outlined">edit</span>
                    Editar Evento
                  </button>
                </router-link>
              </template>
            </div>
          </div>
        </section>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-8 space-y-8">
            <guestList
              :is-view-only="isViewOnly"
              :is-editing="isEditing"
              :data="currentRole"
            ></guestList>
            <checklistExpenses
              :role-id="roleId"
              :data="currentRole"
              @open-modal="showModalChecklistExpenses = true"
            ></checklistExpenses>
          </div>
          <div class="lg:col-span-4 h-full sticky top-28">
            <eventChat></eventChat>
          </div>
        </div>
      </div>
    </main>
    <modalChecklistExpenses
      v-if="showModalChecklistExpenses"
      :role-id="roleId"
      :participants="currentRole.participants"
      @close="showModalChecklistExpenses = false"
      @refresh="loadRoleData()"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted, defineEmits, defineProps } from "vue";

import guestList from "./components/guestList.vue";
import checklistExpenses from "./components/checklistExpenses.vue";
import eventChat from "./components/eventChat.vue";
import modalChecklistExpenses from "./components/modalChecklistExpenses.vue";

import { roleService } from "@/services/roles/roleService.ts";

const props = defineProps({
  mode: {
    type: String,
    default: "edit",
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "pending",
  },
});
const emit = defineEmits(["refresh"]);

const route = useRoute();

const showModalChecklistExpenses = ref(false);

const roleId = route.params.id;
const isViewOnly = computed(() => props.mode === "view");
const isEditing = computed(() => props.mode === "edit");

const isConfirmed = ref(props.status === "confirmed");
const isDeclined = ref(props.status === "declined");

const currentRole = ref(null);
const loading = ref(true);

async function loadRoleData() {
  loading.value = true;
  try {
    const data = await roleService.getRoleById(roleId);
    if (data) {
      currentRole.value = data;
    }
  } finally {
    loading.value = false;
  }
}

async function handleAccept() {
  if (props.status === "confirmed") return;

  const success = await roleService.respondToRole(roleId, "confirmed");
  if (success) {
    isConfirmed.value = true;
    isDeclined.value = false;
    loadRoleData();
  }
}
async function handleDeclined() {
  if (props.status === "declined") return;

  const success = await roleService.respondToRole(roleId, "declined");
  if (success) {
    isDeclined.value = true;
    isConfirmed.value = false;
    loadRoleData();
  }
}

const formatEventDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date
    .toLocaleString("pt-BR", { month: "short" })
    .replace(".", "");
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} ${month.toUpperCase()} • ${time}`;
};

onMounted(() => {
  loadRoleData();
});
</script>

<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
.glass-panel {
  background: rgba(32, 31, 31, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
.tonal-transition {
  background: linear-gradient(180deg, #0e0e0e 0%, #131313 100%);
}
</style>
