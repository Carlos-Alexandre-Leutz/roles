<template>
  <div>
    <ListRoles></ListRoles>
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
    <ModalComponent
      v-if="showModalCreate"
      @close-modal="showModalCreate = false"
    ></ModalComponent>
  </div>
</template>
<script setup>
import ModalComponent from "./components/modalNewRole.vue";
import ListRoles from "./components/listRoles.vue";
import { ref } from "vue";

const showModalCreate = ref(false);

function createNewRole() {
  showModalCreate.value = true;
}
</script>
