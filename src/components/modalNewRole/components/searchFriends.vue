<template>
  <div class="space-y-3">
    <label
      class="text-sm font-bold text-on-surface-variant ml-1 flex justify-between"
    >
      <span>Convidar Amigos</span>
      <span class="text-primary cursor-pointer hover:underline">Ver Todos</span>
    </label>

    <div class="relative mb-4">
      <input
        v-model="searchTerm"
        class="w-full bg-surface-container-high border-none rounded-2xl py-3 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/50"
        placeholder="Buscar por nome ou @username..."
        type="text"
      />
      <span
        class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60"
      >
        search
      </span>
    </div>

    <friendsList
      :friends="filteredFriends"
      v-model:selectedIds="selectedFriends"
    ></friendsList>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { friendService } from "@/services/friends/friendService";
import friendsList from "./friendsList.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const friends = ref([]);
const searchTerm = ref("");

const selectedFriends = ref([...props.modelValue]);

watch(
  selectedFriends,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

async function getMyFriends() {
  friends.value = await friendService.getMyFriends();
}

const filteredFriends = computed(() => {
  let result = friends.value.filter((f) =>
    f.friendName.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
  return result.slice(0, 10);
});

onMounted(() => {
  getMyFriends();
});
</script>