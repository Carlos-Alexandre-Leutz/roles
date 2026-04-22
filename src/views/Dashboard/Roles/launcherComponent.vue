<template>
  <section class="mt-20 p-12 max-w-7xl mx-auto">
    <div class="flex justify-between items-end mb-12">
      <div>
        <h2
          class="text-5xl font-black font-headline text-on-surface tracking-tighter mb-2"
        >
          Meus Rolês
        </h2>
        <p class="text-on-surface-variant text-lg">
          Gerencie seus próximos eventos e encontros.
        </p>
      </div>
      <div class="flex gap-4">
        <div
          class="flex items-center bg-surface-container-low px-4 py-2 rounded-xl gap-3"
        >
          <span class="material-symbols-outlined text-primary text-sm"
            >filter_list</span
          >
          <span class="text-sm font-medium text-on-surface-variant"
            >Filtrar</span
          >
        </div>
      </div>
    </div>
    <listRoles></listRoles>
    <div
      @click="createNewRole()"
      class="group relative min-h-[300px] bg-surface-container-low rounded-[2rem] border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
    >
      <div
        class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary/20 transition-colors"
      >
        <span
          class="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors"
          >add</span
        >
      </div>
      <span
        class="font-headline font-bold text-on-surface-variant group-hover:text-primary"
      >
        Criar Novo Rolê
      </span>
    </div>
    <modalComponent
      v-if="showModalCreate"
      @close-modal="showModalCreate = false"
    ></modalComponent>
  </section>
</template>
<script setup>
import modalComponent from "@/components/modalNewRole/launcherComponent.vue";
import listRoles from "./components/listRoles.vue";
import { ref } from "vue";

const showModalCreate = ref(false);

function createNewRole() {
  showModalCreate.value = true;
}
</script>
