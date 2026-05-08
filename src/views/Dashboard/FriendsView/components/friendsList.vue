<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold font-headline flex items-center gap-2">
        Lista de Amigos
        <span
          v-if="friendsList.length > 0"
          class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
          >{{ friendsList.length }}</span
        >
      </h3>
      <div class="flex gap-2">
        <button
          class="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined">grid_view</span>
        </button>
        <button
          class="p-2 rounded-lg bg-surface-container-high text-primary transition-colors"
        >
          <span class="material-symbols-outlined">view_list</span>
        </button>
      </div>
    </div>

    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="h-24 bg-surface-container-low rounded-2xl border border-outline-variant/10"
      ></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="friend in friendsList"
        :key="friend.id"
        class="glass-panel p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-4 hover:bg-surface-container-highest transition-all group"
      >
        <div class="relative">
          <img
            :alt="friend.friendName"
            class="w-14 h-14 rounded-full bg-surface-container ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all object-cover"
            :src="
              friend.friendPhoto ||
              'https://ui-avatars.com/api/?name=' + friend.friendName
            "
          />
        </div>
        <div class="flex-grow">
          <h4 class="font-bold text-on-surface">{{ friend.friendName }}</h4>
        </div>
        <button
          @click="confirmDelete(friend)"
          class="p-2 text-on-surface-variant hover:text-error transition-all duration-200 active:scale-90"
          title="Remover Amizade"
        >
          <span class="material-symbols-outlined">person_remove</span>
        </button>
      </div>
    </div>

    <div
      v-if="!loading && friendsList.length === 0"
      class="text-center py-10 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/20"
    >
      <p class="text-neutral-500 text-sm">Você ainda não adicionou amigos.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { friendService } from "@/services/friends/friendService";
import Swal from "sweetalert2";

const friendsList = ref([]);
const loading = ref(true);

async function loadFriends() {
  loading.value = true;
  try {
    friendsList.value = await friendService.getMyFriends();
  } finally {
    loading.value = false;
  }
}

async function confirmDelete(friend) {
  console.log(friend);

  const result = await Swal.fire({
    title: "Remover Amizade?",
    text: `Você tem certeza que deseja remover ${friend.friendName}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#db90ff",
    cancelButtonColor: "#201f1f",
    confirmButtonText: "Sim, remover!",
    cancelButtonText: "Cancelar",
    background: "#1a1a1a",
    color: "#ffffff",
  });

  if (result.isConfirmed) {
    try {
      await friendService.removeFriend(friend.id);

      Swal.fire({
        title: "Removido!",
        text: `${friend.friendName} não está mais na sua lista.`,
        icon: "success",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#db90ff",
      });

      loadFriends();
    } catch (error) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível remover o amigo.",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
      });
    }
  }
}

onMounted(() => {
  loadFriends();
});
</script>