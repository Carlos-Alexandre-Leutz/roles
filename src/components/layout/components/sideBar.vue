<template>
  <aside
    class="h-screen w-64 left-0 top-0 fixed bg-surface-container-low flex flex-col py-8 z-50 shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
  >
    <div class="px-8 mb-12">
      <h1
        class="text-3xl font-black bg-gradient-to-r from-[#db90ff] to-[#d37bff] bg-clip-text text-transparent font-headline tracking-tighter"
      >
        ROLES
      </h1>
      <p
        class="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mt-1"
      >
        The Neon Nocturne
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
    <ModalNewRole
      v-if="showModalCreate"
      @close-modal="showModalCreate = false"
    ></ModalNewRole>
  </aside>
</template>
<script setup>
import { ref } from "vue";
import ModalNewRole from "@/components/newRole/components/modalNewRole.vue";

const showModalCreate = ref(false);

function createNewRole() {
  showModalCreate.value = true;
}
</script>
