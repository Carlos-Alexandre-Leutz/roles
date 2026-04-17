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
    <NewRole></NewRole>
  </section>
</template>
<script setup>
import NewRole from "@/components/newRole/launcherComponent.vue";
</script>