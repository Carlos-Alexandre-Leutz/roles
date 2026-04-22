<template>
  <div
    v-if="isLoading"
    class="flex h-screen items-center justify-center bg-zinc-950"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"
    ></div>
  </div>

  <div v-else>
    <div v-if="isLoggedIn && $route.name !== 'home'">
      <menuComponent>
        <RouterView />
      </menuComponent>
    </div>

    <div v-else>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRoute } from "vue-router";
import menuComponent from "./components/layout/menuComponent.vue";

const isLoggedIn = ref(false);
const isLoading = ref(true);
const route = useRoute();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
    isLoading.value = false;
  });
});
</script>