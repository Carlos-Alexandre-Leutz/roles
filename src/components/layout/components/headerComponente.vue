<template>
  <main class="ml-0 lg:ml-64">
    <header
      class="left-0 lg:left-64 fixed top-0 right-0 mb-6 bg-[#0e0e0e] z-40 flex justify-between items-center px-4 sm:px-8 py-4 shadow-[0_0_20px_rgba(157,0,255,0.05)]"
    >
      <div class="flex items-center gap-3 sm:gap-4 min-w-0">
        <div
          class="h-10 w-10 shrink-0 rounded-full bg-surface-container-highest flex items-center justify-center border-[0.5px] border-primary/20"
        >
          <img
            v-if="userPhoto"
            alt="User Avatar"
            class="h-8 w-8 rounded-full object-cover"
            :src="userPhoto"
          />
          <span
            v-else
            class="text-primary font-bold uppercase"
            >{{ (userName || "?").charAt(0) }}</span
          >
        </div>
        <div>
          <span
            class="block max-w-[7rem] sm:max-w-none truncate text-on-surface font-headline font-bold text-lg tracking-tight"
          >
            {{ formatName(userName) || "Carregando..." }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2 sm:gap-6">
        <notificationBell />
        <RouterLink
          to="/settings"
          active-class="!opacity-100 !text-[#db90ff] font-bold border-r-4 border-[#db90ff] bg-gradient-to-r from-[#db90ff]/10 to-transparent"
        >
          <span class="material-symbols-outlined">settings</span>
          <span class="text-[10px] font-bold uppercase tracking-widest"></span>
        </RouterLink>
        <div class="h-6 w-[1px] bg-outline-variant/20"></div>
        <button
          @click="handleLogout()"
          class="flex items-center gap-2 text-[#adaaaa] hover:text-white transition-colors duration-300 font-headline font-bold active:scale-95 transition-transform"
        >
          <span class="material-symbols-outlined">logout</span>
          <span class="text-sm hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
    <emailVerifyBanner />
    <slot></slot>
    <div class="h-32"></div>
  </main>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { userService } from "@/services/users/userService";
import notificationBell from "./notificationBell.vue";
import emailVerifyBanner from "./emailVerifyBanner.vue";

const router = useRouter();
const userName = ref("");
const userPhoto = ref("");

const loadUserData = async () => {
  try {
    const user = await userService.getUser();
    if (user) {
      userName.value = user.displayName || user.email?.split("@")[0] || "";
      const profile = await userService.getMyProfile();
      userName.value = profile.displayName || userName.value;
      userPhoto.value = profile.photoURL || "";
    }
  } catch (error) {
    console.error("Erro ao carregar usuário no Header:", error);
  }
};

onMounted(() => {
  loadUserData();
  window.addEventListener("profile-updated", loadUserData);
});
onBeforeUnmount(() => {
  window.removeEventListener("profile-updated", loadUserData);
});

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push("/login");
  } catch (error) {
    console.error("Erro ao deslogar:", error);
  }
};
const formatName = (fullName) => {
  return userService.formatName(fullName);
};
</script>