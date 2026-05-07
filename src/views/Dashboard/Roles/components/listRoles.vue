<template>
  <div class="bg-surface text-on-surface">
    <div class="space-y-4">
      <template v-for="role in myRoles" :key="role.id">
        <div
          class="group flex flex-col md:flex-row items-center bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-all duration-300 border border-outline-variant/10 hover:border-primary/20"
        >
          <div class="flex-1 flex items-center gap-6 w-full">
            <div class="flex flex-col items-start min-w-[120px]">
              <span
                class="text-xs font-bold uppercase tracking-widest text-primary"
                >{{ formatDate(role.eventDateTime) }}</span
              >
            </div>
            <h3 class="text-xl font-bold font-headline text-on-surface">
              {{ role.title }}
            </h3>
          </div>
          <div class="flex items-center gap-8 w-full md:w-auto mt-6 md:mt-0">
            <span
              class="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-outline-variant/30"
              :class="
                role.myStatus ? 'bg-primary/20' : 'bg-surface-container-highest'
              "
            >
              {{ role.myStatus === "pending" ? "Pendente" : "Confirmado" }}
            </span>
            <div class="flex items-center gap-3">
              <router-link
                :to="{
                  name: 'view-role',
                  params: { id: role.id },
                }"
              >
                <button
                  class="px-6 py-2.5 rounded-full border border-outline-variant text-on-surface text-sm font-semibold hover:bg-surface-bright transition-colors"
                >
                  Ver Detalhes
                </button>
              </router-link>
              <router-link
                :to="{
                  name: 'edit-role',
                  params: { id: role.id },
                }"
              >
                <button
                  v-if="userId == role.ownerId"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined text-xl">edit</span>
                </button>
              </router-link>
              <button
                v-if="userId == role.ownerId"
                @click.stop="confirmDelete(role)"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-error transition-colors"
              >
                <span class="material-symbols-outlined text-xl">delete</span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { roleService } from "../../../../services/roles/roleService.ts";
import { useStore } from "vuex";
import Swal from "sweetalert2";

const store = useStore();
const userId = computed(() => store.getters.userId);

const myRoles = ref([]);
const isLoading = ref(true);

async function fetchUserRoles() {
  try {
    isLoading.value = true;
    const data = await roleService.getMyRoles();
    myRoles.value = data;
  } finally {
    isLoading.value = false;
  }
}

const confirmDelete = async (role) => {
  const result = await Swal.fire({
    title: "Deletar Role?",
    text: `Isso apagará "${role.title}" para todos os participantes. Não há como desfazer!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ff5252",
    cancelButtonColor: "#303030",
    confirmButtonText: "Sim, deletar!",
    cancelButtonText: "Cancelar",
    background: "#1e1e1e",
    color: "#ffffff",
  });

  if (result.isConfirmed) {
    try {
      Swal.fire({
        title: "Deletando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await roleService.deleteRole(role.id);

      Swal.fire({
        title: "Deletado!",
        text: "O evento foi removido com sucesso.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      fetchUserRoles();
    } catch (e) {
      Swal.fire("Erro!", "Não foi possível deletar o evento.", "error");
    }
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = date.getDate();
  const month = date
    .toLocaleString("pt-BR", { month: "short" })
    .replace(".", "");

  const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);

  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} ${monthCapitalized} • ${time}`;
};

defineExpose({
  fetchUserRoles,
});

onMounted(() => {
  fetchUserRoles();
});
</script>
<style>
body {
  font-family: "Manrope", sans-serif;
}
.font-headline {
  font-family: "Plus Jakarta Sans", sans-serif;
}
.glass-card {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
.neon-glow {
  box-shadow: 0 0 40px -10px rgba(219, 144, 255, 0.15);
}
.atmospheric-glow {
  box-shadow: 0 0 64px rgba(219, 144, 255, 0.08);
}
.no-border {
  border: none !important;
}
.tonal-transition {
  transition: background-color 0.3s ease;
}
</style>
