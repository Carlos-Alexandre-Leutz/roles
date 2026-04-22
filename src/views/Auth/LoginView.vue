<template>
  <div
    class="bg-surface text-on-surface font-div min-h-screen overflow-x-hidden flex flex-col"
  >
    <header
      class="fixed top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(157,0,255,0.1)] flex justify-between items-center px-6 py-4"
    >
      <div
        class="text-2xl font-black tracking-tighter text-white uppercase font-headline"
      >
        ROLES
      </div>
      <div class="flex items-center gap-4">
        <button
          class="text-purple-400 p-2 active:scale-95 transition-transform"
        >
          <span class="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </header>
    <main
      class="flex-grow flex items-center justify-center p-6 pt-24 pb-24 relative z-10"
    >
      <div class="w-full max-w-md">
        <!-- Login Card -->
        <div
          class="glass-panel neon-glow rounded-3xl p-8 md:p-10 border border-outline-variant/15 flex flex-col gap-8"
        >
          <div class="space-y-2">
            <h1
              class="text-4xl font-extrabold font-headline tracking-tight text-on-surface"
            >
              Bem-vindo <span class="text-primary">de volta.</span>
            </h1>
            <p class="text-on-surface-variant text-sm">
              Acesse sua conta para continuar.
            </p>
          </div>
          <div class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-on-surface-variant block ml-1"
                for="email"
                >E-mail</label
              >
              <div class="relative">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
                  >mail</span
                >
                <input
                  class="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all"
                  id="email"
                  v-model="email"
                  placeholder="nome@exemplo.com"
                  type="email"
                />
              </div>
            </div>
            <!-- Password Field -->
            <div class="space-y-2">
              <div class="flex justify-between items-center px-1">
                <label
                  class="text-sm font-medium text-on-surface-variant"
                  for="password"
                  >Senha</label
                >
                <a
                  class="text-xs text-primary-dim hover:text-primary transition-colors"
                  href="#"
                  >Esqueceu?</a
                >
              </div>
              <div class="relative">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
                  >lock</span
                >
                <input
                  class="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  v-model="password"
                  @keyup.enter="handleLogin"
                />
              </div>
            </div>
            <!-- Message Paragraph (kept ID) -->
            <p
              :class="[
                'text-xs font-medium min-h-[1rem] transition-all',
                feedbackMsg ? 'opacity-100' : 'opacity-0',
                isError ? 'text-error' : 'text-primary',
              ]"
            >
              {{ feedbackMsg }}
            </p>
            <!-- Buttons Cluster -->
            <div class="space-y-4 pt-2">
              <button
                @click="handleLogin"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-primary to-primary-container ..."
              >
                {{ isLoading ? "Carregando..." : "Entrar" }}
              </button>
              <div class="relative py-2">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-outline-variant/20"></div>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-surface-container-high/0 px-2 text-outline"
                    >ou</span
                  >
                </div>
              </div>
              <RouterLink to="/register">
                <button
                  class="w-full bg-surface-variant/20 text-on-surface font-semibold py-4 rounded-full hover:bg-surface-variant/40 active:scale-[0.98] transition-all border border-outline-variant/15"
                  id="btn-criar-conta"
                >
                  Criar Nova Conta
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
        <!-- Footer area inside focus -->
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const router = useRouter();

const email = ref("");
const password = ref("");
const feedbackMsg = ref("");
const isError = ref(true);
const isLoading = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/dashboard");
    }
  });
});

const handleLogin = async () => {
  if (!email.value || !password.value) {
    displayFeedback("Preencha todos os campos.");
    return;
  }

  isLoading.value = true;
  feedbackMsg.value = "";

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    displayFeedback("Bem-vindo! Redirecionando...", false);
    router.push("/dashboard");
  } catch (error) {
    console.error(error.code);
    isError.value = true;

    switch (error.code) {
      case "auth/invalid-credential":
        displayFeedback("E-mail ou senha incorretos.");
        break;
      case "auth/invalid-email":
        displayFeedback("E-mail inválido.");
        break;
      case "auth/too-many-requests":
        displayFeedback("Muitas tentativas. Tente mais tarde.");
        break;
      default:
        displayFeedback("Erro ao entrar: " + error.message);
    }
  } finally {
    isLoading.value = false;
  }
};

const displayFeedback = (msg, errorStatus = true) => {
  feedbackMsg.value = msg;
  isError.value = errorStatus;
};
</script>


<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.neon-glow {
  box-shadow: 0 0 40px 10px rgba(219, 144, 255, 0.15);
}

.glass-panel {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
</style>