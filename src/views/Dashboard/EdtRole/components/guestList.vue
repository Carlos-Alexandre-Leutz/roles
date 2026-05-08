<template>
  <div class="glass-panel p-8 rounded-[2rem] border border-outline-variant/10">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h3 class="text-2xl font-headline font-bold text-white">
          Lista de Convidados
        </h3>
        <p class="text-on-surface-variant text-sm mt-1">
          {{ confirmedCount }} pessoas confirmadas até agora
        </p>
      </div>

      <button
        v-if="isEditing"
        @click="addParticipants()"
        class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all shadow-lg shadow-primary/10 group"
        title="Adicionar Participantes"
      >
        <span
          class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform"
        >
          {{ showSearchFriends ? "close" : "person_add" }}
        </span>
      </button>
    </div>
    <template v-if="showSearchFriends">
      <searchFriends
        v-model="selectedFriends"
        :exclude-ids="data?.participants.map((p) => p.uid) || []"
      ></searchFriends>
      <button
        @click.stop="handleAddFriendsToRole"
        class="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-on-primary rounded-xl border border-primary/20 transition-all duration-300 group mb-4"
      >
        <span
          class="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform"
        >
          person_add
        </span>
        <span class="text-sm font-bold">Convidar Selecionados</span>
      </button>
    </template>
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
          <button
            v-if="isEditing && participant.uid !== data.ownerId"
            @click="handleRemove(participant.uid)"
            class="text-on-surface-variant/40 hover:text-red-400 transition-colors"
            title="Remover do role"
          >
            <span class="material-symbols-outlined text-lg">person_remove</span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, defineEmits } from "vue";
import Swal from "sweetalert2";
import searchFriends from "@/components/modalNewRole/components/searchFriends.vue";
import { roleService } from "@/services/roles/roleService";

const props = defineProps({
  roleId: {
    type: String,
    required: true,
  },
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

const emit = defineEmits(["load-role-data"]);

const selectedFriends = ref([]);
const showSearchFriends = ref(false);

const confirmedCount = computed(() => {
  return props.data?.participants.filter((p) => p.status === "confirmed")
    .length;
});

const addParticipants = () => {
  showSearchFriends.value = !showSearchFriends.value;
};

async function handleAddFriendsToRole() {
  if (selectedFriends.value.length === 0) {
    Swal.fire("Ops!", "Selecione pelo menos um amigo para convidar.", "info");
    return;
  }

  const success = await roleService.addFriendsByUid(
    props.roleId,
    selectedFriends.value
  );

  if (success) {
    showSearchFriends.value = false;
    emit("load-role-data");
  }
}
async function handleRemove(uid) {
  const success = await roleService.removeParticipantByUid(props.roleId, uid);

  if (success) {
    props.data.participants = props.data.participants.filter(
      (p) => p.uid !== uid
    );
  }
}
</script>
