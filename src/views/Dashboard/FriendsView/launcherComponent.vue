<template>
  <main class="mt-20 p-8 flex-grow">
    <div class="max-w-7xl mx-auto">
      <div class="mb-10">
        <h1
          class="text-4xl font-extrabold font-headline tracking-tight text-on-surface"
        >
          Meus Amigos
        </h1>
        <p class="text-on-surface-variant mt-2 text-lg">
          Gerencie seu círculo social e convide novas conexões.
        </p>
        <router-link to="/search-friends">
          <button
            class="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full hover:bg-primary/90 active:scale-95 transition-all shadow-sm font-medium text-sm"
          >
            <span class="material-symbols-outlined text-sm">person_add</span>
            Adicionar
          </button>
        </router-link>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Friends List -->
        <div class="lg:col-span-12 space-y-12">
          <!-- Lista de Amigos -->
          <friendsList></friendsList>
          <!-- Convites Pendentes -->
          <pendingInvitations></pendingInvitations>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import pendingInvitations from "./components/pendingInvitations.vue";
import friendsList from "./components/friendsList.vue";
</script>
<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
.glass-panel {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
}
.glow-accent {
  box-shadow: 0 0 40px rgba(219, 144, 255, 0.1);
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0e0e0e;
}
::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 10px;
}
</style>