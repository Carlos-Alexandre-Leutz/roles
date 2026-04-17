<template>
  <div>
    <div class="">
      <!-- Modal Overlay -->
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      >
        <!-- Create New Rolê Modal -->
        <div
          class="glass-modal w-full max-w-2xl rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(157,0,255,0.2)] overflow-hidden relative"
        >
          <!-- Background Glow Decoration -->
          <div
            class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"
          ></div>
          <div class="relative z-10">
            <header class="mb-8">
              <h2
                class="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2"
              >
                Criar Novo <span class="text-primary">Rolê</span>
              </h2>
              <p class="text-on-surface-variant font-body">
                Organize sua próxima experiência épica com seus amigos.
              </p>
            </header>
            <form @submit.prevent="handleCreateEvent()" class="space-y-6">
              <!-- Event Name -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-on-surface-variant ml-1"
                  >Nome do Rolê</label
                >
                <div class="relative">
                  <input
                    v-model="eventName"
                    required
                    class="w-full bg-surface-container-high border-none rounded-2xl py-4 px-6 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Ex: Churrasco na Laje ou Rave Secreta"
                    type="text"
                  />
                </div>
              </div>
              <!-- Date and Location Grid -->
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-bold text-on-surface-variant ml-1"
                    >Data e Hora</label
                  >
                  <div
                    class="flex items-center bg-surface-container-high rounded-2xl px-4"
                  >
                    <span class="material-symbols-outlined text-primary"
                      >calendar_today</span
                    >
                    <input
                      v-model="eventDateTime"
                      required
                      class="w-full bg-transparent border-none py-4 px-2 text-on-surface focus:ring-0"
                      type="datetime-local"
                    />
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-bold text-on-surface-variant ml-1"
                    >Local</label
                  >
                  <div
                    class="flex items-center bg-surface-container-high rounded-2xl px-4"
                  >
                    <span class="material-symbols-outlined text-primary"
                      >location_on</span
                    >
                    <input
                      v-model="locationVenue"
                      class="w-full bg-transparent border-none py-4 px-2 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0"
                      placeholder="São Paulo, SP"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <!-- Invite Friends Section -->
              <div class="space-y-3">
                <label
                  class="text-sm font-bold text-on-surface-variant ml-1 flex justify-between"
                >
                  <span>Convidar Amigos</span>
                  <span class="text-primary cursor-pointer hover:underline"
                    >Ver Todos</span
                  >
                </label>
                <div class="relative mb-4">
                  <input
                    class="w-full bg-surface-container-high border-none rounded-2xl py-3 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/50"
                    placeholder="Buscar por nome ou @username..."
                    type="text"
                  />
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60"
                    >search</span
                  >
                </div>
                <!-- Friends List -->
                <div class="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                  <div
                    class="flex-shrink-0 group cursor-pointer text-center space-y-1"
                  >
                    <div
                      class="w-14 h-14 rounded-full border-2 border-primary p-0.5 relative"
                    >
                      <img
                        alt="Friend 1"
                        class="w-full h-full rounded-full object-cover"
                        data-alt="close up of a stylish young man with glasses smiling in city street lighting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqO4SvP6GqAsqGdmwtE_v3FsZx41Xt7Q0J6nSrtrNiSYMGxSVXMik6T3bsxBKxVuYkHGUoGnIDQacmtlUWb15SQx_niZbul79t21xBTSZYgxDdNPb3pA7M-hHSvbce9OXLX_Y2bh-mtff-GbzO8c8G3-jswwLNm3dUMQRV-Y7A4cARoChLIv06xaR54nrmtCDO6F0wikyot3MwL5W_TKZigXi9m1xtyob-kHFPW55P0eMcTrWOkcVYzrHOZHyn_dhmGIxdyii29dn_"
                      />
                      <div
                        class="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full w-5 h-5 flex items-center justify-center border-2 border-surface-container-high"
                      >
                        <span
                          class="material-symbols-outlined text-[12px] font-bold"
                          >check</span
                        >
                      </div>
                    </div>
                    <p class="text-[10px] text-on-surface font-bold">Lucas</p>
                  </div>
                  <div
                    class="flex-shrink-0 group cursor-pointer text-center space-y-1"
                  >
                    <div
                      class="w-14 h-14 rounded-full border-2 border-transparent p-0.5 hover:border-primary/50 transition-colors"
                    >
                      <img
                        alt="Friend 2"
                        class="w-full h-full rounded-full object-cover"
                        data-alt="portrait of a young woman with a warm smile and curly hair in soft golden lighting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEsU6M5cIce57WdFMCd5Vz_YvUurLz1X5EBX6Qe97MpuPbzTi3LnTq_vicSPbOdFEjW3eGa_d61I3baHn5-TFfDfdxy3tELFl-kiSWs85T0op8otyw_meNIkELVefb1ilufz3ZNvNqOKYeYaVp3IziLCKSjm4e5-STl3CpGcA3QQMpUed0gbivB5dHIQuEJvDvrE5irwDdXxkH_WyaWYVzQD-mUnvdqpp4wYFcRW6pRO4WIDFiAveKjiPBDVM7VaVeT4hk5lfvn8Ts"
                      />
                    </div>
                    <p
                      class="text-[10px] text-on-surface-variant group-hover:text-on-surface"
                    >
                      Ana
                    </p>
                  </div>
                  <div
                    class="flex-shrink-0 group cursor-pointer text-center space-y-1"
                  >
                    <div
                      class="w-14 h-14 rounded-full border-2 border-transparent p-0.5 hover:border-primary/50 transition-colors"
                    >
                      <img
                        alt="Friend 3"
                        class="w-full h-full rounded-full object-cover"
                        data-alt="middle aged man with a confident look and sharp features in dramatic dark lighting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-ELt33CUhsmcgYreCq1ugjjwlJCODa1p6LNre96aBOXHreTn5ABCS3A56C06OTMu3ra0VnuqE6Pxo-ydMzSlCN027_AYltssQ_6qIq-f9FOiYaYW3Lv85HQWOTDuTZH46OL4P1JqQFfNzYOFTCv9cbQPIgQWl9BRBwaKfDzyBOXD-p2sGWGHpX0v_jkRHkghte_QEfnN2Wwjy4l_xYVH1DsseErse1GtlS4WM5wzdWXaLhuQMtasU_nj1wCrs56lCOEhe90fpclRz"
                      />
                    </div>
                    <p
                      class="text-[10px] text-on-surface-variant group-hover:text-on-surface"
                    >
                      Beto
                    </p>
                  </div>
                  <div
                    class="flex-shrink-0 group cursor-pointer text-center space-y-1"
                  >
                    <div
                      class="w-14 h-14 rounded-full border-2 border-transparent p-0.5 hover:border-primary/50 transition-colors"
                    >
                      <img
                        alt="Friend 4"
                        class="w-full h-full rounded-full object-cover"
                        data-alt="young woman with a serious and artistic expression in soft purple atmospheric studio lighting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw0u3advBtCqtd7tBYeXKGeGbxtaq8IgPbvc62nP39lgPQ0UBmFmkxIQpc6W-7gHiL5SJ6JOewaLhItNd4eIMo4BgPh_97EQvWCp23yYdMUS5pyj3WeKIuZw003bRv7gUgeEXXTkQAhpWl-3YeV1PO8EIuZr5uYVgWFZ-VjdvL-DwnYD5vw1aBCZBUKiGxD7Hp1u_PGeSw8V8XDMWAlmo5iABhM9-8SHYYARCGC7SSdmFtNs2O0CPAPpk--QwzDi-edUfyYd-68ibH"
                      />
                    </div>
                    <p
                      class="text-[10px] text-on-surface-variant group-hover:text-on-surface"
                    >
                      Clara
                    </p>
                  </div>
                  <div
                    class="flex-shrink-0 group cursor-pointer text-center space-y-1"
                  >
                    <div
                      class="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-dashed border-outline-variant hover:border-primary transition-colors"
                    >
                      <span class="material-symbols-outlined text-primary"
                        >add</span
                      >
                    </div>
                    <p class="text-[10px] text-on-surface-variant">Mais</p>
                  </div>
                </div>
              </div>
              <!-- Actions -->
              <div class="flex items-center justify-end space-x-4 pt-4">
                <button
                  @click="closeModal()"
                  class="px-8 py-4 rounded-full text-on-surface-variant font-bold hover:bg-surface-variant/40 transition-colors active:scale-95"
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  class="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-extrabold shadow-[0_0_40px_rgba(219,144,255,0.3)] hover:brightness-110 active:scale-95 transition-all"
                  type="submit"
                >
                  {{ isLoading ? "Criando..." : "Criar Rolê" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { auth } from "@/services/firebase";
import { roleService } from "../../../services/roles/roleService.ts";

const emit = defineEmits(["close-modal"]);

// Reactive State (English standard)
const eventName = ref("");
const eventDateTime = ref("");
const locationVenue = ref("");
const isLoading = ref(false);

function closeModal() {
  emit("close-modal");
}

async function handleCreateEvent() {
  console.log('12');
  
  if (!eventName.value) return;

  isLoading.value = true;

  try {
    const user = auth.currentUser;

    // Data Object
    const eventData = {
      title: eventName.value,
      scheduledDate: eventDateTime.value,
      venue: locationVenue.value,
      status: "planning",
      ownerId: user.uid,
      participants: [user.uid],
      description: "",
      items: [],
      createdAt: new Date().toISOString(),
    };

    await roleService.createRole(eventData, user.uid);

    closeModal();
  } catch (error) {
    console.error("Error creating event:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
body {
  background-color: #0e0e0e;
  color: #ffffff;
  font-family: "Manrope", sans-serif;
}
.neon-glow {
  box-shadow: 0 0 64px rgba(157, 0, 255, 0.15);
}
.glass-modal {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(40px);
  border: 0.5px solid rgba(219, 144, 255, 0.2);
}
.tonal-transition {
  background: linear-gradient(to bottom, #131313, #0e0e0e);
}
</style>
