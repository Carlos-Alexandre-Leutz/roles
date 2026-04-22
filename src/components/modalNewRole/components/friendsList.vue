<template>
  <div class="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
    <div
      v-for="friend in friends"
      :key="friend.id"
      @click="toggleFriend(friend.friendId)"
      class="flex-shrink-0 group cursor-pointer text-center space-y-1"
    >
      <div
        class="w-14 h-14 rounded-full border-2 p-0.5 relative transition-all"
        :class="
          isSelected(friend.friendId) ? 'border-primary' : 'border-transparent'
        "
      >
        <img
          :alt="friend.friendName"
          class="w-full h-full rounded-full object-cover bg-surface-container"
          :src="
            friend.friendPhoto ||
            'https://ui-avatars.com/api/?name=' + friend.friendName
          "
        />

        <div
          v-if="isSelected(friend.friendId)"
          class="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full w-5 h-5 flex items-center justify-center border-2 border-surface-container-high animate-in zoom-in duration-200"
        >
          <span class="material-symbols-outlined text-[12px] font-bold"
            >check</span
          >
        </div>
      </div>
      <p
        class="text-[10px] font-bold truncate w-14"
        :class="
          isSelected(friend.friendId)
            ? 'text-on-surface'
            : 'text-on-surface-variant'
        "
      >
        {{ friend.friendName.split(" ")[0] }}
      </p>
    </div>

    <div class="flex-shrink-0 group cursor-pointer text-center space-y-1">
      <div
        class="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-dashed border-outline-variant hover:border-primary transition-colors"
      >
        <span class="material-symbols-outlined text-primary">add</span>
      </div>
      <p class="text-[10px] text-on-surface-variant">Convite</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  friends: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedIds: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:selectedIds"]);

const isSelected = (id) => {
  return props.selectedIds.includes(id);
};

const toggleFriend = (id) => {
  const newSelection = [...props.selectedIds];
  const index = newSelection.indexOf(id);

  if (index > -1) {
    newSelection.splice(index, 1);
  } else {
    newSelection.push(id);
  }

  emit("update:selectedIds", newSelection);
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>