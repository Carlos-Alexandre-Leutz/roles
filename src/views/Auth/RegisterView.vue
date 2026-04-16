<template>
  <div>
    <div
      class="bg-surface font-body text-on-surface selection:bg-primary/30 min-h-screen flex flex-col items-center justify-center overflow-x-hidden"
    >
      <!-- Ambient Decorative Background Elements -->
      <div
        class="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary atmospheric-glow rounded-full pointer-events-none"
      ></div>
      <div
        class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary-container atmospheric-glow rounded-full pointer-events-none"
      ></div>
      <!-- Top Navigation (Contextually Hidden/Simplified for Transactional Page) -->
      <header
        class="fixed top-0 left-0 w-full z-50 flex items-center justify-start px-6 py-4 bg-black"
      >
        <div
          class="text-2xl font-black tracking-tighter text-white uppercase font-headline"
        >
          ROLES
        </div>
      </header>
      <main
        class="relative z-10 w-full max-w-md px-6 py-20 flex flex-col items-center"
      >
        <!-- Registration Card -->
        <div
          class="w-full glass-panel neon-glow rounded-[2rem] p-8 flex flex-col gap-8"
        >
          <!-- Header Section -->
          <div class="text-center space-y-2">
            <h1
              class="font-headline text-4xl font-extrabold tracking-tight text-on-surface"
            >
              Join the <span class="text-primary">Stage</span>
            </h1>
            <p class="text-on-surface-variant text-sm tracking-wide">
              Enter your details to create your profile
            </p>
          </div>
          <!-- Form -->
          <form @submit.prevent="handleRegister" class="flex flex-col gap-5">
            <!-- Full Name Field -->
            <div class="flex flex-col gap-2">
              <label
                class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1"
                >Full Name</label
              >
              <div class="relative flex items-center">
                <span
                  class="material-symbols-outlined absolute left-4 text-on-surface-variant text-lg"
                  >person</span
                >
                <input
                  class="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all duration-300"
                  placeholder="John Doe"
                  v-model="fullName"
                  type="text"
                />
              </div>
            </div>
            <!-- Email Field -->
            <div class="flex flex-col gap-2">
              <label
                class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1"
                >Email</label
              >
              <div class="relative flex items-center">
                <span
                  class="material-symbols-outlined absolute left-4 text-on-surface-variant text-lg"
                  >mail</span
                >
                <input
                  class="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all duration-300"
                  placeholder="john@roles.app"
                  type="email"
                  v-model="email"
                />
              </div>
            </div>
            <!-- Password Field -->
            <div class="flex flex-col gap-2">
              <label
                class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1"
                >Password</label
              >
              <div class="relative flex items-center">
                <span
                  class="material-symbols-outlined absolute left-4 text-on-surface-variant text-lg"
                  >lock</span
                >
                <input
                  class="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all duration-300"
                  placeholder="••••••••"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                />
                <span
                  @click="togglePassword"
                  class="material-symbols-outlined absolute right-4 text-on-surface-variant text-lg cursor-pointer hover:text-white"
                  >{{ showPassword ? "visibility_off" : "visibility" }}</span
                >
              </div>
            </div>
            <!-- Confirm Password Field -->
            <div class="flex flex-col gap-2">
              <label
                class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1"
                >Confirm Password</label
              >
              <div class="relative flex items-center">
                <span
                  class="material-symbols-outlined absolute left-4 text-on-surface-variant text-lg"
                  >verified_user</span
                >
                <input
                  class="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all duration-300"
                  placeholder="••••••••"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                />
              </div>
            </div>
            <!-- CTA Button -->
            <button
              :disabled="isLoading"
              class="mt-4 w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold py-4 rounded-full shadow-lg active:scale-95 hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              <span v-if="isLoading">Criando conta...</span>
              <template v-else>
                Cadastrar
                <span class="material-symbols-outlined">arrow_forward</span>
              </template>
            </button>
            <p
              v-if="feedbackMsg"
              :class="[
                'text-sm text-center font-medium mt-2 transition-all',
                isError ? 'text-red-400' : 'text-primary',
              ]"
            >
              {{ feedbackMsg }}
            </p>
          </form>

          <!-- Social Divider -->
          <div class="flex items-center gap-4 py-2">
            <div class="h-[1px] flex-1 bg-outline-variant/20"></div>
            <span
              class="text-xs font-semibold uppercase tracking-widest text-outline"
              >or connect with</span
            >
            <div class="h-[1px] flex-1 bg-outline-variant/20"></div>
          </div>
          <!-- Social Options -->
          <div class="flex gap-4">
            <button
              class="flex-1 bg-surface-container-high hover:bg-surface-container-highest py-3 rounded-xl flex items-center justify-center transition-colors"
            >
              <img
                alt="Google"
                class="w-5 h-5"
                data-alt="Google company logo emblem colorful letter G icon minimalist digital vector illustration"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwgfqilBES-POsa-ozT-7O2Izb0V_8Ek7p5pabHK_4YwBNDMkbFI6ZF3yNLNd1Ftr5FcE_wZXgYyS4iBM-mNBxTiXSDpLCNUlc09xn9EIBMKVsimBFN5weBTaE0NhVxuqsZTTo5eP2-X0sXmzrj-3JfbJm46xeKY_BqY5nvhpyKwmQWD54fyifAvv_tprbLVFCaJRMiN-iFwFhYAOYqxUc0lwt8yrEsGauuKKtWcxtdBIaCTSbO8umej8ZXFu7irACQsGsLwFq4VwE"
              />
            </button>
            <button
              class="flex-1 bg-surface-container-high hover:bg-surface-container-highest py-3 rounded-xl flex items-center justify-center transition-colors"
            >
              <span
                class="material-symbols-outlined text-on-surface"
                style="font-variation-settings: 'FILL' 1"
                >ios</span
              >
            </button>
          </div>
        </div>
        <!-- Footer Link -->
        <div class="mt-8 text-center">
          <p class="text-on-surface-variant text-sm">
            Já tem uma conta?
            <RouterLink to="/login">
              <a class="text-primary font-bold hover:underline ml-1" href="#">
                Entrar
              </a>
            </RouterLink>
          </p>
        </div>
      </main>
      <!-- Content for visual interest -->
      <div
        class="fixed bottom-0 left-0 w-full p-12 pointer-events-none opacity-20 hidden lg:block"
      >
        <div class="flex justify-between items-end">
          <div class="max-w-xs space-y-4">
            <div class="w-12 h-12 rounded-full overflow-hidden">
              <img
                alt="Avatar"
                data-alt="close-up portrait of creative professional young man in cinematic moody lighting with purple neon highlights"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDARHgasuBYGLBD4oOCA2Kz92igqC2BQ15cfaRYgZw8UlvLHL8597af3spesor-L44Rt_gwGbkArfWOb5R1za6hm-FdnuiJW44NuuDpCAzSa1CT6tu5yZfSYlIgg7gg8d1OhYpgvpsit0c_m6SdEvIJZ56SseQhoSsZLR1PiHF8RiQ3HywZRfZimJ5A7MF7U48bor7I8UbazUL5xoEbELnvoJr4L02L9wV8Dxit-zK04tkrlMuqCJBNmNKhLP6wTpY14EO3pYLa8CqT"
              />
            </div>
            <p class="text-xs font-medium italic">
              "The future of professional casting and role management starts
              here. Join thousands of creators worldwide."
            </p>
          </div>
          <div class="text-right">
            <span
              class="text-6xl font-black text-outline-variant/10 tracking-tighter"
              >CREATE. PLAY. ROLE.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const router = useRouter();

// Estados Reativos
const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const feedbackMsg = ref("");
const isError = ref(true);
const isLoading = ref(false);
const showPassword = ref(false);

const handleRegister = async () => {
  console.log("asd");

  // 1. Validações básicas
  if (!fullName.value || !email.value || !password.value) {
    displayFeedback("Por favor, preencha todos os campos.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    displayFeedback("As senhas não coincidem.");
    return;
  }

  if (password.value.length < 6) {
    displayFeedback("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  isLoading.value = true;
  feedbackMsg.value = "";

  try {
    // 2. Criar usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    // 3. Adicionar o Nome ao perfil do usuário (opcional, mas recomendado)
    await updateProfile(userCredential.user, {
      displayName: fullName.value,
    });

    displayFeedback("Conta criada com sucesso! Redirecionando...", false);

    // 4. Redirecionar
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  } catch (error) {
    console.error(error.code);
    isError.value = true;

    switch (error.code) {
      case "auth/email-already-in-use":
        displayFeedback("Este e-mail já está em uso.");
        break;
      case "auth/invalid-email":
        displayFeedback("E-mail inválido.");
        break;
      case "auth/weak-password":
        displayFeedback("Senha muito fraca.");
        break;
      default:
        displayFeedback("Erro ao criar conta: " + error.message);
    }
  } finally {
    isLoading.value = false;
  }
};

const displayFeedback = (msg, errorStatus = true) => {
  feedbackMsg.value = msg;
  isError.value = errorStatus;
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
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
.neon-glow {
  box-shadow: 0 0 40px rgba(219, 144, 255, 0.15);
}
.atmospheric-glow {
  filter: blur(64px);
  opacity: 0.15;
}
</style>