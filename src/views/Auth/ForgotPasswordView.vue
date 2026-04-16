<template>
  <div>
    <div
      class="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden bg-mesh"
    >
      <!-- Header / TopAppBar (Suppressing BottomNav for Transactional Flow) -->
      <header
        class="w-full top-0 sticky flex items-center justify-between px-6 py-4 z-50 bg-[#0e0e0e]"
      >
        <div class="flex items-center gap-4">
          <button
            class="text-[#db90ff] active:scale-95 duration-200 hover:opacity-80 transition-opacity"
          >
            <span class="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <span
            class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#db90ff]"
            >ROLES</span
          >
        </div>
        <div class="text-2xl font-black tracking-tighter text-[#ffffff]">
          ROLES
        </div>
      </header>
      <main
        class="flex-grow flex flex-col items-center justify-center px-6 py-12 relative"
      >
        <!-- Background Ambient Glow -->
        <div
          class="absolute -z-10 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div class="w-full max-w-md flex flex-col items-center">
          <!-- Hero Icon/Visual -->
          <div
            class="mb-8 w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center neon-glow border border-primary/20"
          >
            <span
              class="material-symbols-outlined text-primary text-4xl"
              style="font-variation-settings: 'FILL' 1"
              >lock_reset</span
            >
          </div>
          <!-- Typography Header -->
          <div class="text-center mb-10">
            <h1
              class="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter text-on-surface mb-4"
            >
              Recuperar <span class="text-primary">Acesso</span>
            </h1>
            <p
              class="text-on-surface-variant font-body leading-relaxed max-w-[280px] mx-auto"
            >
              Insira seu e-mail para receber as instruções de redefinição de
              senha.
            </p>
          </div>
          <!-- Form Container -->
          <div class="w-full space-y-6">
            <!-- Input Field -->
            <div class="relative group">
              <label
                class="block text-sm font-medium text-on-surface-variant mb-2 ml-1"
                for="email"
                >E-mail</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">mail</span>
                </div>
                <input
                  class="block w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder-on-surface-variant/40 focus:ring-0 focus:bg-surface-container-highest transition-all duration-300"
                  id="email"
                  placeholder="seu@email.com"
                  type="email"
                />
                <div
                  class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-focus-within:w-full transition-all duration-500 rounded-full"
                ></div>
              </div>
            </div>
            <!-- Primary Action Button -->
            <button
              class="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold py-5 rounded-full shadow-[0_8px_32px_rgba(219,144,255,0.25)] hover:shadow-[0_8px_48px_rgba(219,144,255,0.4)] active:scale-[0.98] transition-all duration-200"
            >
              Enviar Link de Recuperação
            </button>
            <!-- Footer Link -->
            <div class="text-center pt-4">
              <a
                class="text-on-surface-variant hover:text-primary transition-colors font-label font-medium flex items-center justify-center gap-2"
                href="#"
              >
                <span class="material-symbols-outlined text-sm"
                  >arrow_back</span
                >
                Voltar para o Login
              </a>
            </div>
          </div>
        </div>
        <!-- Decorative Bento Card (Subtle Branding) -->
        <div
          class="mt-20 w-full max-w-sm glass-panel p-6 rounded-3xl border border-outline-variant/10"
        >
          <div class="flex items-start gap-4">
            <div class="p-3 bg-primary/10 rounded-2xl">
              <span
                class="material-symbols-outlined text-primary"
                style="font-variation-settings: 'FILL' 1"
                >security</span
              >
            </div>
            <div>
              <h3 class="text-on-surface font-headline font-bold text-sm">
                Segurança Garantida
              </h3>
              <p class="text-on-surface-variant text-xs mt-1 leading-snug">
                Seu link de recuperação expira em 24 horas por motivos de
                segurança.
              </p>
            </div>
          </div>
        </div>
      </main>
      <!-- Footer Space -->
      <footer class="py-8 text-center">
        <p
          class="text-on-surface-variant/30 text-[10px] tracking-widest uppercase font-label"
        >
          © 2024 ROLES Digital Ecosystem
        </p>
      </footer>
      <!-- Image for Contextual Atmosphere (Decorative Hidden/Mesh substitute) -->
      <div class="hidden">
        <img
          alt="Aesthetic Background"
          data-alt="Abstract dark aesthetic background with deep purple neon glows and smooth fluid gradients with subtle grain texture"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxRVb9mJSYxwIZnkI96zr0kbwHC3VOo1aImZidUvUQhJJLLL97R1kZtCZlNmlNt74gyfwhr7Q3VZJw1Ohpbg8dkz36pO9EMbgTlg8ysywFLmzJdQ-d-AeNIi_qmdUKhnZaBt-Pvhzx0pcOhZfEkCF_c-J5BwpJ-IpR_Gr6FC-uaBmnURDNfujPJEck3e1hOtI0NJ0aph36kO7TaUpNBWdLuSN009SlADlXhXH7qdDmpICrTb7EHugYtTxUCzGwRH_x505d6T-nd02L"
        />
      </div>
    </div>
  </div>
</template>
<style>
body {
  background-color: #0e0e0e;
  font-family: "Manrope", sans-serif;
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
.neon-glow {
  box-shadow: 0 0 40px rgba(219, 144, 255, 0.15);
}
.glass-panel {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
.bg-mesh {
  background: radial-gradient(
      circle at 80% 20%,
      rgba(211, 123, 255, 0.08) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 20% 80%,
      rgba(118, 49, 253, 0.1) 0%,
      transparent 40%
    );
}
</style>