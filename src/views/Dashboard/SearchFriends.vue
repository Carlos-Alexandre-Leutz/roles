<template>
  <div>
    <section class="mt-20 max-w-4xl mx-auto mb-16">
      <div class="text-center mb-10">
        <h1
          class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
        >
          Encontre sua tribo.
        </h1>
        <p class="text-on-surface-variant max-w-lg mx-auto">
          Busque por amigos, criadores ou qualquer pessoa na cena noturna do
          ROLES.
        </p>
      </div>
      <div class="relative group">
        <div
          class="absolute -inset-1 bg-gradient-to-r from-primary to-tertiary rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"
        ></div>
        <div
          class="relative flex items-center bg-surface-container-low rounded-2xl p-2 shadow-2xl"
        >
          <div class="flex items-center justify-center pl-6 pr-4 text-primary">
            <span class="material-symbols-outlined text-3xl">search</span>
          </div>
          <input
            class="w-full bg-transparent border-none focus:ring-0 text-xl py-4 font-medium text-white placeholder-neutral-600"
            placeholder="Procurar por nome"
            type="text"
            v-model="searchQuery"
            @input="performSearch"
          />
        </div>
      </div>
    </section>
    <!-- Results: List Layout -->
    <section class="max-w-5xl mx-auto">
      <!-- List Layout for User Rows -->
      <div class="space-y-4">
        <div
          v-for="user in usersList"
          :key="user.id"
          class="group relative bg-surface-container-low/50 backdrop-blur-md rounded-2xl p-4 transition-all duration-300 hover:bg-surface-container-high border border-neutral-800/50 hover:border-primary/30"
        >
          <div class="flex items-center gap-6">
            <div class="relative flex-shrink-0">
              <img
                :src="
                  user.photoURL ||
                  'https://ui-avatars.com/api/?name=' + user.displayName
                "
                class="relative w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-white">
                {{ formatName(user.displayName) }}
              </h3>
              <p class="text-primary-dim text-sm">
                @{{ user.email.split("@")[0] }}
              </p>
            </div>
            <div class="flex-shrink-0">
              <div v-if="user.isRequested" class="flex-shrink-0">
                <span class="material-symbols-outlined text-base text-primary"
                  >done</span
                >
                <span class="hidden sm:inline">Solicitado</span>
              </div>

              <button
                v-else
                @click="sendFriendRequest(user.id)"
                class="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <span class="material-symbols-outlined text-base"
                  >person_add</span
                >
                <span class="hidden sm:inline">Adicionar Amigo</span>
              </button>
            </div>
          </div>
        </div>

        <div class="py-12 flex flex-col items-center text-center">
          <div v-if="searchQuery.length <= 2" class="animate-pulse">
            <span
              class="material-symbols-outlined text-6xl text-neutral-700 mb-4"
              >search</span
            >
            <h3 class="text-xl font-medium text-neutral-500">
              Encontre seus amigos
            </h3>
            <p class="text-neutral-600 text-sm">
              Digite o nome ou e-mail de quem você procura.
            </p>
          </div>

          <div
            v-if="searchQuery.length > 2 && usersList.length === 0"
            class="space-y-6"
          >
            <div class="flex flex-col items-center">
              <span
                class="material-symbols-outlined text-6xl text-primary/40 mb-2"
                >person_search</span
              >
              <h3 class="text-xl font-bold text-white">
                Nenhum "<span>{{ searchQuery }}</span
                >" por aqui...
              </h3>
              <p class="text-on-surface-variant text-sm max-w-xs">
                Parece que seu amigo ainda não conhece o Roles. Que tal mandar
                um convite?
              </p>
            </div>

            <router-link
              to="/invite"
              class="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-black text-sm hover:bg-primary transition-colors shadow-xl"
            >
              <span class="material-symbols-outlined text-base">send</span>
              CONVIDAR AGORA
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { userService } from "@/services/users/userService";
import { friendService } from "@/services/friends/friendService";
const searchQuery = ref("");
const usersList = ref([]);

async function performSearch() {
  if (searchQuery.value.length < 2) {
    usersList.value = [];
    return;
  }

  const users = await userService.searchUsers(searchQuery.value);
  const sentRequests = await friendService.getMySentRequests();

  usersList.value = users.map((user) => {
    return {
      ...user,
      isRequested: sentRequests.some((req) =>
        req.participants.includes(user.id)
      ),
    };
  });
}

async function sendFriendRequest(userId) {
  const result = await friendService.sendFriendRequest(userId);
  if (result.success) {
    const user = usersList.value.find((u) => u.id === userId);
    if (user) user.isRequested = true;
  }
}

const formatName = (fullName) => {
  return userService.formatName(fullName);
};
</script>
<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
.neon-glow {
  box-shadow: 0 0 15px rgba(219, 144, 255, 0.3);
}
.glass-panel {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(40px);
}
body {
  background-color: #0e0e0e;
  color: #ffffff;
  font-family: "Manrope", sans-serif;
}
h1,
h2,
h3 {
  font-family: "Plus Jakarta Sans", sans-serif;
}
</style>