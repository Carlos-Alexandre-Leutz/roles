<template>
  <aside>
    <div
      class="hidden lg:flex h-screen w-64 left-0 top-0 fixed bg-surface-container-low flex flex-col py-8 z-50 shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
    >
      <div class="hidden md:block px-8 mb-12">
        <h1
          class="text-3xl font-black bg-gradient-to-r from-[#db90ff] to-[#d37bff] bg-clip-text text-transparent font-headline tracking-tighter"
        >
          ROLES
        </h1>
        <p
          class="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mt-1"
        >
          BY LDS Software
        </p>
      </div>
      <nav class="flex-1 space-y-1">
        <RouterLink
          to="/friends"
          class="flex items-center px-8 py-4 text-on-surface-variant opacity-70 hover:bg-[#201f1f] hover:text-white transition-all duration-200 cursor-pointer active:translate-x-1"
          active-class="!opacity-100 !text-[#db90ff] font-bold border-r-4 border-[#db90ff] bg-gradient-to-r from-[#db90ff]/10 to-transparent"
        >
          <span class="material-symbols-outlined mr-4">group</span>
          <span class="font-medium">Amigos</span>
        </RouterLink>

        <RouterLink
          to="/dashboard"
          class="flex items-center px-8 py-4 text-on-surface-variant opacity-70 hover:bg-[#201f1f] hover:text-white transition-all duration-200 cursor-pointer active:translate-x-1"
          active-class="!opacity-100 !text-[#db90ff] font-bold border-r-4 border-[#db90ff] bg-gradient-to-r from-[#db90ff]/10 to-transparent"
        >
          <span class="material-symbols-outlined mr-4">event</span>
          <span class="font-medium">Meus Rolês</span>
        </RouterLink>

        <RouterLink
          to="/settings"
          class="flex items-center px-8 py-4 text-on-surface-variant opacity-70 hover:bg-[#201f1f] hover:text-white transition-all duration-200 cursor-pointer active:translate-x-1"
          active-class="!opacity-100 !text-[#db90ff] font-bold border-r-4 border-[#db90ff] bg-gradient-to-r from-[#db90ff]/10 to-transparent"
        >
          <span class="material-symbols-outlined mr-4">settings</span>
          <span class="font-medium">Configurações</span>
        </RouterLink>
      </nav>
      <div class="px-6 mt-auto">
        <button
          @click="inviteViaWhatsApp()"
          class="w-full py-4 mb-3 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          Convidar amigos
        </button>
        <button
          @click="createNewRole()"
          class="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          Criar Novo Rolê
        </button>
        <div class="mt-8 pt-8 border-t border-outline-variant/10">
          <a
            class="flex items-center px-2 py-4 text-on-surface-variant opacity-70 hover:text-error transition-colors"
            href="#"
          >
            <span class="material-symbols-outlined mr-4">logout</span>
            <span class="font-medium">Sair</span>
          </a>
        </div>
      </div>
    </div>
    <!-- Bottom Navigation for Mobile -->
    <nav
      class="lg:hidden fixed bottom-0 left-0 right-0 mt-4 bg-[#0e0e0e]/95 backdrop-blur-2xl border-t border-outline-variant/10 flex justify-around items-center h-20 px-4 z-50"
    >
      <RouterLink
        to="/dashboard"
        class="flex flex-col items-center gap-1 text-[#adaaaa]"
        active-class="!opacity-100 !text-[#db90ff] font-bold border-r-4 border-[#db90ff] bg-gradient-to-r from-[#db90ff]/10 to-transparent"
      >
        <span
          class="material-symbols-outlined"
          style="font-variation-settings: 'FILL' 1"
          >event</span
        >
        <span class="font-medium">Meus Rolês</span>
      </RouterLink>
      <RouterLink
        to="/friends"
        class="flex flex-col items-center gap-1 text-[#adaaaa]"
        active-class="!opacity-100 !text-[#db90ff] font-bold border-r-4 border-[#db90ff] bg-gradient-to-r from-[#db90ff]/10 to-transparent"
      >
        <span class="material-symbols-outlined mr-4">group</span>
        <span class="font-medium">Amigos</span>
      </RouterLink>
      <div
        class="flex flex-col items-center gap-1 text-[#adaaaa]"
        @click="createNewRole()"
      >
        <span class="material-symbols-outlined">add_circle</span>
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Criar Novo Rolê</span
        >
      </div>
    </nav>
  </aside>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { friendService } from "@/services/friends/friendService";

const router = useRouter();
const store = useStore();

const createNewRole = () => {
  store.dispatch("openModalCreate");
  router.push({ name: "dashboard" });
};

const inviteViaWhatsApp = () => {
  friendService.inviteViaWhatsApp();
};
</script>
