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
    <div @click="createNewRole()" class="mt-4">
      <div
        class="group flex items-center justify-center bg-surface-container-low p-6 rounded-2xl border-2 border-dashed border-outline-variant/20 hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all duration-300"
      >
        <div
          class="flex items-center gap-3 text-on-surface-variant group-hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined">add_circle</span>
          <span class="font-headline font-bold">Criar Novo Rolê</span>
        </div>
      </div>
    </div>
    <listRoles ref="listRolesRef"></listRoles>
    <modalComponent
      v-if="showModalCreate"
      @close-modal="showModalCreate = false"
      @update-roles="fetchRoles()"
    ></modalComponent>
  </section>
</template>
<script setup>
import modalComponent from "@/components/modalNewRole/launcherComponent.vue";
import listRoles from "./components/listRoles.vue";
import { ref } from "vue";

const showModalCreate = ref(false);
const listRolesRef = ref(null);

const fetchRoles = () => {
  if (listRolesRef.value) {
    listRolesRef.value.fetchUserRoles();
  }
};

function createNewRole() {
  showModalCreate.value = true;
}
</script>
