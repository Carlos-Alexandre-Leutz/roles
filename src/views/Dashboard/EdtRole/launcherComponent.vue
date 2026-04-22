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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMRLsKkzsGozROokdpNZHaMm7GqcTuJuP7I4K28djalwuNaHJhvWZhLYMQoTLTZ0tdeGX_WerTJWBpOq-3Sm8qczUg48wUnzLxL-UPAuAu-jjiq0oakhurWNniQvefDa6N618wyMFwZ5wFzPe4XyAu9BP_FuXgskZ7vPO1K118fA2C49d-4OCNhiLeScIMMjv0UjYhwkv2U28CJ-HzbS9cPBulAwFRG-QisAAFCGlwyeCgODbLz1AMHUudL_HOP61ICGK2IqgvEdV0"
            />
          </div>
          <div
            class="absolute bottom-0 left-0 p-10 z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="bg-primary/20 backdrop-blur-md text-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-primary/20"
                  >Confirmado</span
                >
                <span
                  class="text-on-surface-variant text-sm flex items-center gap-2"
                >
                  <span class="material-symbols-outlined text-base"
                    >calendar_today</span
                  >
                  15 OUT, 2023 • 14:00
                </span>
              </div>
              <h2
                class="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-white mb-2"
              >
                Churrasco no Prédio
              </h2>
              <div class="flex items-center gap-2 text-on-surface-variant">
                <span class="material-symbols-outlined text-primary"
                  >location_on</span
                >
                <span class="text-lg">Rua das Flores, 123 - São Paulo, SP</span>
              </div>
            </div>
            <div class="flex gap-4">
              <button
                class="flex items-center gap-2 px-8 py-4 bg-surface-container-highest/60 backdrop-blur-xl rounded-full font-bold border border-outline-variant/20 hover:bg-surface-container-highest transition-all"
              >
                <span class="material-symbols-outlined">share</span>
                Convidar
              </button>
              <template v-if="isViewOnly">
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
            ></guestList>
            <checklistExpenses></checklistExpenses>
          </div>
          <div class="lg:col-span-4 h-full sticky top-28">
            <eventChat></eventChat>
          </div>
        </div>
      </div>
    </main>
    <!-- Bottom Navigation for Mobile -->
    <nav
      class="md:hidden fixed bottom-0 left-0 right-0 bg-[#0e0e0e]/95 backdrop-blur-2xl border-t border-outline-variant/10 flex justify-around items-center h-20 px-4 z-50"
    >
      <a class="flex flex-col items-center gap-1 text-primary" href="#">
        <span
          class="material-symbols-outlined"
          style="font-variation-settings: 'FILL' 1"
          >event</span
        >
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Evento</span
        >
      </a>
      <a class="flex flex-col items-center gap-1 text-[#adaaaa]" href="#">
        <span class="material-symbols-outlined">group</span>
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Pessoas</span
        >
      </a>
      <a class="flex flex-col items-center gap-1 text-[#adaaaa]" href="#">
        <span class="material-symbols-outlined">checklist</span>
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Tasks</span
        >
      </a>
      <a class="flex flex-col items-center gap-1 text-[#adaaaa]" href="#">
        <span class="material-symbols-outlined">forum</span>
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Chat</span
        >
      </a>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

import guestList from "./components/guestList.vue";
import checklistExpenses from "./components/checklistExpenses.vue";
import eventChat from "./components/eventChat.vue";

const props = defineProps({
  mode: {
    type: String,
    default: "edit",
  },
});
const route = useRoute();

const roleId = route.params.id;
const isViewOnly = computed(() => props.mode === "view");
const isEditing = computed(() => props.mode === "edit");
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
