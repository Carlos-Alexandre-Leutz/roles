<template>
  <main class="ml-64">
    <header
      class="top-0 left-64 right-0 fixed bg-[#0e0e0e] z-40 flex justify-between items-center px-8 py-4 shadow-[0_0_20px_rgba(157,0,255,0.05)]"
    >
      <div class="flex items-center gap-4">
        <div
          class="h-10 w-10 rounded-full bg-surface-container-highest flex items-center justify-center border-[0.5px] border-primary/20"
        >
          <img
            alt="User Avatar"
            class="h-8 w-8 rounded-full"
            data-alt="close-up portrait of a stylish young man with modern glasses and confident expression, soft purple neon ambient light"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOm8SyM40RbOOljWuUIL4naLelaHZNNttetZbuTUGaLnO0zSJK21doWiPhLzYO9mQoG_sIAHM9chLA9qJzMfDLkeRoTz0XyFTwLaI_TunI9RLUgP0wyj4e_I-zcpIjTtyXV01N-zBamU8pRrqpEHRuvkyja6PYFGyBKSj_sl3bDZfa1pX_Pdo9wGufepoJahEnVkFAytdwEV78Gwi_XaCPlUZLT-Ub_fv0jsNfeyV9xOg3-WffWLA7JjSi0j8XkCA8_gdoyk9xeD7n"
          />
        </div>
        <div>
          <span
            class="block text-on-surface font-headline font-bold text-lg tracking-tight"
            >João Silva</span
          >
          <span class="text-xs text-on-surface-variant">São Paulo, SP</span>
        </div>
      </div>
      <div class="flex items-center gap-6">
        <button
          class="text-on-surface-variant hover:text-white transition-colors p-2"
        >
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <div class="h-6 w-[1px] bg-outline-variant/20"></div>
        <button
          @click="handleLogout()"
          class="flex items-center gap-2 text-[#adaaaa] hover:text-white transition-colors duration-300 font-headline font-bold active:scale-95 transition-transform"
        >
          <span class="material-symbols-outlined">logout</span>
          <span class="text-sm">Sair</span>
        </button>
      </div>
    </header>
    <slot></slot>
  </main>
</template>
<script setup>
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase"; // Importando o auth centralizado

const router = useRouter();

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push("/login");
  } catch (error) {
    console.error("Erro ao deslogar:", error);
  }
};
</script>