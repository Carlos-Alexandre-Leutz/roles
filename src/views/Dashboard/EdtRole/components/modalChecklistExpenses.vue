<template>
  <div
    class="fixed inset-0 z-0 opacity-40 blur-sm pointer-events-none overflow-y-auto"
  >
    <!-- Top Bar -->

    <main class="pt-24 px-6 pb-32 space-y-8">
      <!-- Event Hero -->
      <div
        class="h-64 rounded-xl overflow-hidden relative surface-container-low"
      >
        <img
          class="w-full h-full object-cover"
          data-alt="A high-contrast cinematic shot of a modern urban rooftop barbecue party at dusk. The scene is illuminated by string lights and glowing neon purple accents, reflecting off sleek glass surfaces and dark metallic furniture. In the background, the city skyline twinkles with distant lights, creating a moody, premium, and festive atmosphere that aligns with the deep black and vibrant purple brand identity."
          src="https://lh3.googleusercontent.com/aida/ADBb0ugcIzka2fn3CUqQ1SbH_ZS-du8gr3XySycTqpSPbLZJ4sa2vWBo2we-XPHJo97-u2NLtoSnTqi8V_6LpcY9qx7tLGQ_AIPR9Xzmm5I5dKt4BaqZ1KWrPtyFxV0qkr_JIGYCvtXtR0kB3nsDCOJA5ewVu2ddV8kINzHEAHfgLHUAwRa85GhNEB9apBT48ZbTRQtfIhKyuPQkZsukSWuUgemEDOlQyv6g4ZXKi1-I3QVVR0mPnxKDSK8ZHxlRRJGQ6yutuSfxBAty0Q"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-surface to-transparent"
        ></div>
      </div>
      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div class="p-6 rounded-xl bg-surface-container-low">
          <span
            class="text-on-surface-variant text-xs uppercase tracking-widest font-semibold"
            >Total Gastos</span
          >
          <p class="text-3xl font-black text-primary font-display mt-1">
            R$ 450,00
          </p>
        </div>
        <div class="p-6 rounded-xl bg-surface-container-low">
          <span
            class="text-on-surface-variant text-xs uppercase tracking-widest font-semibold"
            >Confirmados</span
          >
          <p class="text-3xl font-black text-white font-display mt-1">12</p>
        </div>
      </div>
      <!-- Checklist Section -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold font-display text-white">
          Checklist de Itens
        </h2>
        <div class="space-y-3">
          <div
            class="p-4 rounded-xl bg-surface-container-high flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary"
                >check_circle</span
              >
              <span class="text-on-surface">Picanha (3kg)</span>
            </div>
            <span class="text-on-surface-variant text-sm">Ricardo</span>
          </div>
          <div
            class="p-4 rounded-xl bg-surface-container-high flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-on-surface-variant"
                >radio_button_unchecked</span
              >
              <span class="text-on-surface">Cerveja IPA</span>
            </div>
            <span class="text-on-surface-variant text-sm">Ana Paula</span>
          </div>
        </div>
      </section>
    </main>
  </div>
  <!-- Modal Overlay -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
  >
    <!-- Atmospheric Glow Behind Modal -->
    <div
      class="absolute w-[500px] h-[500px] atmospheric-glow rounded-full"
    ></div>

    <!-- The Modal: Adicionar Item -->
    <div
      class="relative w-full max-w-md glass-effect rounded-[32px] overflow-hidden neon-glow flex flex-col p-8 space-y-8 border border-primary/10"
    >
      <!-- Modal Header -->
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-white tracking-tight font-display">
          Adicionar Nova Despesa
        </h2>
        <p class="text-on-surface-variant font-medium">
          Insira os detalhes para dividir com a galera.
        </p>
      </div>
      <!-- Form Fields -->
      <div class="space-y-6">
        <!-- Nome do Item -->
        <div class="space-y-2">
          <label
            class="text-xs uppercase tracking-widest font-bold text-primary ml-1"
            >Nome do Item</label
          >
          <div
            class="bg-surface-container-high rounded-2xl flex items-center px-4 h-16 border-b-2 border-transparent focus-within:border-primary transition-all"
          >
            <span class="material-symbols-outlined text-on-surface-variant mr-3"
              >shopping_cart</span
            >
            <input
              v-model="viewModel.name"
              class="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant w-full font-semibold"
              placeholder="Ex: Carvão"
              type="text"
            />
          </div>
        </div>
        <!-- Valor -->
        <div class="space-y-2">
          <label
            class="text-xs uppercase tracking-widest font-bold text-primary ml-1"
            >Valor (R$)</label
          >
          <div
            class="bg-surface-container-high rounded-2xl flex items-center px-4 h-16 border-b-2 border-transparent focus-within:border-primary transition-all"
          >
            <span class="material-symbols-outlined text-on-surface-variant mr-3"
              >payments</span
            >
            <input
              v-model="viewModel.price"
              class="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant w-full font-semibold"
              placeholder="0,00"
              step="0.01"
              type="number"
            />
          </div>
        </div>
        <!-- Responsável -->
        <div class="space-y-2">
          <label
            class="text-xs uppercase tracking-widest font-bold text-primary ml-1"
            >Responsável</label
          >
          <div
            class="bg-surface-container-high rounded-2xl flex items-center px-4 h-16 border-b-2 border-transparent focus-within:border-primary transition-all cursor-pointer relative"
          >
            <span class="material-symbols-outlined text-on-surface-variant mr-3"
              >person_search</span
            >
            <select
              v-model="viewModel.responsible"
              class="bg-transparent border-none focus:ring-0 text-on-surface w-full font-semibold appearance-none"
            >
              <option disabled value="">Selecione um convidado</option>
              <option
                v-for="p in participants"
                :key="p.uid"
                :value="p.uid"
                class="bg-surface-container-highest"
              >
                {{ p.displayName }}
              </option>
            </select>
            <span
              class="material-symbols-outlined text-on-surface-variant absolute right-4 pointer-events-none"
              >expand_more</span
            >
          </div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="flex flex-col gap-3 pt-4">
        <button
          @click="handleAddItem()"
          class="h-16 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-black text-lg tracking-tight active:scale-95 transition-transform"
        >
          Adicionar à Lista
        </button>
        <button
          @click="closeModal()"
          class="h-14 rounded-full bg-surface-variant/20 text-on-surface font-bold text-md hover:bg-surface-variant/40 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import { roleService } from "@/services/roles/roleService";
import Swal from "sweetalert2";

const props = defineProps({
  roleId: {
    type: String,
    default: "",
  },
  participants: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["close", "refresh"]);

const closeModal = () => {
  emit("close");
};

const viewModel = ref({
  name: "",
  price: 0,
  responsible: "",
});

const handleAddItem = async () => {
  if (!viewModel.value.name) {
    Swal.fire("Ops!", "Preencha todos os campos", "warning");
    return;
  }

  const res = props.participants.find(
    (p) => p.uid === viewModel.value.responsible
  );

  const success = await roleService.addItemToRole(props.roleId, {
    name: viewModel.value.name,
    price: viewModel.value.price || 0,
    responsibleId: viewModel.value.responsible || null,
    responsibleName: res?.displayName || "Pode ser você =)",
  });

  if (success) {
    Swal.fire({
      icon: "success",
      title: "Item adicionado!",
      timer: 1500,
      showConfirmButton: false,
    });
    emit("refresh");
    emit("close");
  }
};
</script>
<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
.glass-effect {
  background: rgba(32, 31, 31, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
.neon-glow {
  box-shadow: 0 0 40px rgba(219, 144, 255, 0.15);
}
.atmospheric-glow {
  filter: blur(64px);
  background: #db90ff;
  opacity: 0.1;
}
</style>