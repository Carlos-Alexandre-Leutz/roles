<template>
  <form @submit.prevent="handleCreateEvent()" class="space-y-6">
    <!-- Event Name -->
    <div class="space-y-2">
      <label class="text-sm font-bold text-on-surface-variant ml-1"
        >Nome do Rolê</label
      >
      <div class="relative">
        <input
          v-model="eventName"
          required
          class="w-full bg-surface-container-high border-none rounded-2xl py-4 px-6 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="Ex: Churrasco na Laje ou Rave Secreta"
          type="text"
        />
      </div>
    </div>
    <!-- Date and Location Grid -->
    <div class="grid grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="text-sm font-bold text-on-surface-variant ml-1"
          >Data e Hora</label
        >
        <div
          class="flex items-center bg-surface-container-high rounded-2xl px-4"
        >
          <span class="material-symbols-outlined text-primary"
            >calendar_today</span
          >
          <input
            v-model="eventDateTime"
            required
            class="w-full bg-transparent border-none py-4 px-2 text-on-surface focus:ring-0"
            type="datetime-local"
          />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-bold text-on-surface-variant ml-1"
          >Local</label
        >
        <div
          class="flex items-center bg-surface-container-high rounded-2xl px-4"
        >
          <span class="material-symbols-outlined text-primary"
            >location_on</span
          >
          <input
            v-model="locationVenue"
            class="w-full bg-transparent border-none py-4 px-2 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0"
            placeholder="São Paulo, SP"
            type="text"
          />
        </div>
      </div>
    </div>
    <!-- Invite Friends Section -->
    <searchFriends v-model="selectedFriends"></searchFriends>
    <!-- Actions -->
    <div class="flex items-center justify-end space-x-4 pt-4">
      <button
        @click="closeModal()"
        class="px-8 py-4 rounded-full text-on-surface-variant font-bold hover:bg-surface-variant/40 transition-colors active:scale-95"
        type="button"
      >
        Cancelar
      </button>
      <button
        class="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-extrabold shadow-[0_0_40px_rgba(219,144,255,0.3)] hover:brightness-110 active:scale-95 transition-all"
        type="submit"
      >
        {{ isLoading ? "Criando..." : "Criar Rolê" }}
      </button>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { roleService } from "@/services/roles/roleService.ts";
import searchFriends from "./searchFriends.vue";

const emit = defineEmits(["close-modal"]);

const eventName = ref("");
const eventDateTime = ref("");
const locationVenue = ref("");
const isLoading = ref(false);
const selectedFriends = ref([]);

async function handleCreateEvent() {
  if (!eventName.value) return;

  isLoading.value = true;

  try {
    const eventData = {
      title: eventName.value,
    };

    await roleService.createRole(eventData, selectedFriends.value);

    closeModal();
  } catch (error) {
    console.error("Error creating event:", error);
  } finally {
    isLoading.value = false;
  }
}
function closeModal() {
  emit("close-modal");
}
</script>