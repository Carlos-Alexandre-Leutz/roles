<template>
  <div class="bg-surface text-on-surface">
    <main class="flex flex-col">
      <section class="w-full max-w-5xl items-center justify-center">
        <template v-for="role in myRoles" :key="role.id">
          <div
            class="group relative bg-surface-container-low rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 w-full max-w-md"
          >
            <div class="h-48 overflow-hidden relative">
              <img
                alt="Churrasco no Prédio"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="overhead view of a vibrant rooftop barbecue party at dusk with strings of warm fairy lights and smoke rising"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo4qBJ1nLGH8YjJ-Hka5EDoITmH0zthmtxl2CKOzR6-HH9bjU46sOmetBcgAgqXX3FISzRw6bXZP54sEDhbM3cWNvPkTeOrQ4_odjQe1JuVZYkL4oO7dHSQ-faUaH60_VC7Y5ZWfs3BlhSuL6PxBJPodXGepJigHjkwX4pCVJtm3vy6PGKnVh4V1NfzQKJ0UK_If40G86SBVRfaxZ-bElApeDitV09G3rQ9V9xYlO_kP1ETsyRCMDRGqYXhcQ-PCJCtxsbjkZWJQCf"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"
              ></div>
              <div
                class="absolute top-4 right-4 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30"
              >
                <span
                  class="text-[10px] font-bold text-primary uppercase tracking-wider"
                  >Confirmado</span
                >
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-2 text-primary mb-3">
                <span class="material-symbols-outlined text-sm"
                  >calendar_today</span
                >
                <span class="text-xs font-bold uppercase tracking-widest">
                  {{ formatDate(role.createdAt) }}</span
                >
              </div>
              <h3
                class="text-2xl font-bold font-headline text-on-surface mb-6 leading-tight"
              >
                {{ role.title }}
              </h3>
              <div class="flex gap-3">
                <button
                  class="flex-1 py-3 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95 transition-transform"
                >
                  Ver Detalhes
                </button>

                <router-link
                  :to="{ name: 'edit-role', params: { id: role.id } }"
                  class="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-primary transition-all"
                >
                  <button
                    class="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors active:scale-95 transition-transform"
                  >
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </section>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { roleService } from "../../../../services/roles/roleService.ts";

const myRoles = ref([]);
const isLoading = ref(true);

async function fetchUserRoles() {
  try {
    isLoading.value = true;
    const data = await roleService.getMyRoles();
    myRoles.value = data;
    console.log("Roles carregados:", myRoles.value);
  } catch (error) {
    console.error("Erro ao carregar a lista:", error);
  } finally {
    isLoading.value = false;
  }
}

function formatDate(timestamp) {
  if (!timestamp) return "Data pendente...";

  if (timestamp.seconds) {
    const data = new Date(timestamp.seconds * 1000);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return "Data inválida";
}

onMounted(() => {
  fetchUserRoles();
});
</script>


<style>
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
/* remover */
.atmospheric-glow {
  box-shadow: 0 0 64px rgba(219, 144, 255, 0.08);
}
/* remover */
.no-border {
  border: none !important;
}
.tonal-transition {
  transition: background-color 0.3s ease;
}
</style>
