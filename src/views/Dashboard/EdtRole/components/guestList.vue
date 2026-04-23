<template>
  <div class="glass-panel p-8 rounded-[2rem] border border-outline-variant/10">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h3 class="text-2xl font-headline font-bold text-white">
          Lista de Convidados
        </h3>
        <p class="text-on-surface-variant text-sm mt-1">
          24 pessoas confirmadas até agora
        </p>
      </div>
      <button class="text-primary font-bold text-sm hover:underline">
        Ver Todos
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <template
        v-for="participant in data?.participants"
        :key="participant.uid"
      >
        <div
          class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl group hover:bg-surface-container transition-colors"
        >
          <div class="flex items-center gap-4">
            <img
              :alt="participant.name"
              class="w-14 h-14 rounded-full bg-surface-container ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all object-cover"
              :src="'https://ui-avatars.com/api/?name=' + participant.name"
            />
            <div>
              <p class="font-bold text-white">{{ participant.name }}</p>
              <p class="text-xs text-on-surface-variant">
                @{{ participant.name.replace(/\s+/g, "") }}
              </p>
            </div>
          </div>
          <span
            v-if="participant.status == 'confirmed'"
            class="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-tighter"
          >
            Confirmado
          </span>
          <span
            v-if="participant.status == 'pending'"
            class="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full uppercase tracking-tighter"
          >
            Pendente
          </span>
          <span
            v-if="participant.status == 'declined'"
            class="text-[10px] font-bold text-error bg-error/10 px-3 py-1 rounded-full uppercase tracking-tighter"
          >
            Recusado
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isViewOnly: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
