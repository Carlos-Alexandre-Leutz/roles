<template>
  <div
    class="glass-panel p-8 rounded-[2rem] border border-outline-variant/10 relative overflow-hidden"
  >
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10"
    ></div>
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center"
        >
          <span class="material-symbols-outlined text-primary"
            >shopping_cart</span
          >
        </div>
        <h3 class="text-2xl font-headline font-bold text-white">
          Checklist &amp; Despesas
        </h3>
      </div>
      <button
        @click="opemModal()"
        class="bg-surface-container-highest px-6 py-2 rounded-full text-sm font-bold border border-outline-variant/20 hover:text-primary transition-colors"
      >
        + Adicionar Item
      </button>
    </div>
    <div class="space-y-3">
      <div
        v-for="item in itensList"
        :key="item.id"
        class="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl border-l-4 border-primary/40"
      >
        <div class="flex items-center gap-4">
          <div
            @click="handleToggleItem(item)"
            class="w-6 h-6 rounded-md border-2 border-primary flex items-center justify-center cursor-pointer"
            :class="
              item.isDone ? 'border-primary bg-primary/10' : 'border-outline'
            "
          >
            <span
              v-if="item.isDone"
              class="material-symbols-outlined text-xs text-primary"
              style="font-variation-settings: 'FILL' 1"
              >check</span
            >
          </div>
          <button
            @click.stop="handleDeleteItem(item)"
            class="text-on-surface-variant/50 hover:text-red-400 transition-colors"
          >
            <span class="material-symbols-outlined text-lg">delete</span>
          </button>
          <div>
            <p class="text-white font-bold">{{ item.name }}</p>
            <p class="text-xs text-on-surface-variant">
              Responsável:
              <span class="text-primary font-semibold">
                {{ item.responsibleName }}
              </span>
            </p>
          </div>
        </div>
        <div @click="edit(item)" class="text-right">
          <p class="text-white font-bold">R$ {{ item.price.toFixed(2) }}</p>
          <span
            class="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest"
          >
            {{ item.isDone ? "Pago" : "Pendente" }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="mt-8 p-6 bg-primary/10 rounded-3xl flex justify-between items-center border border-primary/10"
    >
      <div>
        <p
          class="text-primary-fixed text-sm font-bold uppercase tracking-widest"
        >
          Total Estimado
        </p>
        <p class="text-3xl font-headline font-black text-white">R$ 775,00</p>
      </div>
      <button
        class="bg-primary text-on-primary-container px-8 py-3 rounded-full font-bold"
      >
        Dividir Conta
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineEmits } from "vue";
import Swal from "sweetalert2";
import { roleService } from "@/services/roles/roleService";

const props = defineProps({
  roleId: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(["open-modal"]);

const itensList = ref([]);

const opemModal = () => {
  emit("open-modal");
};

async function handleToggleItem(item) {
  const newStatus = !item.isDone;

  if (newStatus) {
    const result = await Swal.fire({
      title: "Confirmar compra?",
      text: `Você confirma que já comprou o item: ${item.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, comprei!",
      cancelButtonText: "Ainda não",
      background: "#1e293b",
      color: "#f8fafc",
      confirmButtonColor: "#10b981",
    });

    if (!result.isConfirmed) return;
  } else {
    const result = await Swal.fire({
      title: "Desmarcar item?",
      text: `O item "${item.name}" voltará para a lista de pendentes.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, desmarcar",
      cancelButtonText: "Cancelar",
      background: "#1e293b",
      color: "#f8fafc",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;
  }

  const success = await roleService.toggleItemStatus(
    props.roleId,
    item.id,
    newStatus
  );

  if (success) {
    item.isDone = newStatus;

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: newStatus ? "Item marcado!" : "Item desmarcado!",
      showConfirmButton: false,
      timer: 1500,
      background: "#1e293b",
      color: "#f8fafc",
    });
  }
}

async function handleDeleteItem(item) {
  const result = await Swal.fire({
    title: "Remover item?",
    text: `Tem certeza que deseja excluir "${item.name}" da lista?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, deletar",
    cancelButtonText: "Cancelar",
    background: "#1e293b",
    color: "#f8fafc",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#475569",
  });

  if (result.isConfirmed) {
    const success = await roleService.deleteItemFromRole(props.roleId, item.id);

    if (success) {
      itensList.value = itensList.value.filter((i) => i.id !== item.id);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Item removido!",
        showConfirmButton: false,
        timer: 1500,
        background: "#1e293b",
        color: "#f8fafc",
      });
    }
  }
}

watch(
  () => props.data,
  (newData) => {
    itensList.value = newData?.items || [];
  },
  { immediate: true }
);
</script>
