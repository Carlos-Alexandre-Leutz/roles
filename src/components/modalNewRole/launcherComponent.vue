<template>
  <div>
    <!-- Modal Overlay -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <!-- Create New Rolê Modal -->
      <div
        class="glass-modal w-full max-w-2xl rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(157,0,255,0.2)] overflow-hidden relative"
      >
        <!-- Background Glow Decoration -->
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"
        ></div>
        <div class="relative z-10">
          <header class="mb-8">
            <h2
              class="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2"
            >
              Criar Novo <span class="text-primary">Rolê</span>
            </h2>
            <p class="text-on-surface-variant font-body">
              Organize sua próxima experiência épica com seus amigos.
            </p>
          </header>
          <modalForm @close-modal="closeModal()"></modalForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import modalForm from "./components/modalForm.vue";

const emit = defineEmits(["close-modal"]);
function closeModal() {
  emit("close-modal");
}
</script>

<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
.neon-glow {
  box-shadow: 0 0 64px rgba(157, 0, 255, 0.15);
}
.glass-modal {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(40px);
  border: 0.5px solid rgba(219, 144, 255, 0.2);
}
.tonal-transition {
  background: linear-gradient(to bottom, #131313, #0e0e0e);
}
</style>
