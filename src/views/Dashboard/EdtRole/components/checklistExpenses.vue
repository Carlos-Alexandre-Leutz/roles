<template>
  <div
    class="glass-panel p-5 sm:p-8 rounded-[2rem] border border-outline-variant/10 relative overflow-hidden"
  >
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10"
    ></div>
    <div class="flex justify-between items-center gap-3 mb-8">
      <div class="flex items-center gap-3 sm:gap-4 min-w-0">
        <div
          class="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center"
        >
          <span class="material-symbols-outlined text-primary"
            >shopping_cart</span
          >
        </div>
        <h3 class="text-xl sm:text-2xl font-headline font-bold text-white">
          Checklist &amp; Despesas
        </h3>
      </div>
      <button
        @click="opemModal()"
        class="bg-surface-container-highest px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold border border-outline-variant/20 hover:text-primary transition-colors whitespace-nowrap shrink-0"
        v-if="isEditing"
      >
        + Adicionar Item
      </button>
    </div>
    <div class="space-y-3">
      <div
        v-for="item in itensList"
        :key="item.id"
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 bg-surface-container-low rounded-2xl border-l-4 border-primary/40"
      >
        <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div
            @click="handleToggleItem(item, userId)"
            class="w-6 h-6 shrink-0 rounded-md border-2 border-primary flex items-center justify-center cursor-pointer"
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
          <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 shrink-0">
          <button
            v-if="isEditing"
            @click.stop="handleDeleteItem(item)"
            class="p-1.5 text-on-surface-variant/50 hover:text-red-400 transition-colors"
          >
            <span class="material-symbols-outlined text-lg">delete</span>
          </button>
          <button
            v-if="item.responsibleId === userId"
            @click.stop="handleAbandonTask(item)"
            class="p-1.5 text-on-surface-variant/50 hover:text-orange-400 transition-colors group"
            title="Não posso mais cuidar disso"
          >
            <span
              class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform"
            >
              person_remove
            </span>
          </button>
          <button
            v-if="!item.responsibleId"
            @click.stop="handleVolunteer(item)"
            class="p-1.5 text-on-surface-variant/50 hover:text-primary transition-colors flex items-center gap-1 group"
            title="Eu cuido disso!"
          >
            <span
              class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform"
            >
              pan_tool
            </span>
          </button>
          </div>
          <div class="min-w-0">
            <p class="text-white font-bold break-words">{{ item.name }}</p>
            <p class="text-xs text-on-surface-variant">
              Responsável:
              <span class="text-primary font-semibold">
                {{ item.responsibleName }}
              </span>
            </p>
            <p
              v-if="item.responsibleId"
              class="text-xs text-on-surface-variant"
            >
              Clique no check para confirmar que você já garantiu esse item!
            </p>
            <p
              v-if="!item.responsibleId"
              class="text-xs text-on-surface-variant"
            >
              Para ajudar no rolê, clique na
              <span
                class="text-primary material-symbols-outlined text-lg group-hover:scale-110 transition-transform"
              >
                pan_tool
              </span>
              e escolha o que você vai levar.
            </p>
          </div>
        </div>
        <div class="w-full sm:w-auto text-left sm:text-right shrink-0 flex sm:block items-center justify-between gap-3">
          <div class="flex items-center sm:justify-end gap-2">
            <p class="text-white font-bold">
              {{ item.price ? `R$ ${item.price.toFixed(2)}` : "R$ 0,00" }}
            </p>
            <button
              v-if="isEditing || item.responsibleId === userId"
              @click.stop="edit(item)"
              class="p-1.5 text-on-surface-variant/70 hover:text-primary transition-colors"
              title="Editar valor"
            >
              <span class="material-symbols-outlined text-lg">edit</span>
            </button>
          </div>
          <span
            class="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest"
          >
            {{ item.isDone ? "Comprado" : "Pendente" }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="mt-8 p-5 sm:p-6 bg-primary/10 rounded-3xl flex flex-wrap gap-4 justify-between items-center border border-primary/10"
    >
      <div>
        <p
          class="text-primary-fixed text-sm font-bold uppercase tracking-widest"
        >
          Total Estimado
        </p>
        <p class="text-3xl font-headline font-black text-white">
          R$
          {{ totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}
        </p>
      </div>
      <button
        @click="showSplit = !showSplit"
        class="bg-primary text-on-primary-container px-8 py-3 rounded-full font-bold"
      >
        {{ showSplit ? "Ocultar Divisão" : "Dividir Conta" }}
      </button>
    </div>
    <div v-if="showSplit" class="mt-4 p-6 bg-surface-container-low rounded-3xl space-y-6">
      <div>
        <p class="text-white font-bold">
          Total comprado: R$ {{ fmt(split.total) }}
        </p>
        <p class="text-xs text-on-surface-variant">
          Dividido igualmente entre {{ split.people.length }} pessoas:
          R$ {{ fmt(split.share) }} cada. Só conta o que já foi marcado como
          comprado.
        </p>
      </div>

      <div v-if="split.people.length" class="space-y-2">
        <div
          v-for="r in split.people"
          :key="r.uid"
          class="flex items-center justify-between gap-3 py-2 border-b border-outline-variant/10"
        >
          <div class="min-w-0">
            <p class="text-sm text-white font-bold truncate">
              {{ r.name }}{{ r.uid === userId ? " (você)" : "" }}
            </p>
            <p class="text-xs text-on-surface-variant">
              Levou R$ {{ fmt(r.paid) }} • Parte R$ {{ fmt(r.share) }}
            </p>
          </div>
          <span
            class="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
            :class="
              r.balance > 0.01
                ? 'bg-emerald-500/20 text-emerald-400'
                : r.balance < -0.01
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-surface-container-highest text-on-surface-variant'
            "
          >
            {{
              r.balance > 0.01
                ? `Recebe R$ ${fmt(r.balance)}`
                : r.balance < -0.01
                  ? `Paga R$ ${fmt(-r.balance)}`
                  : "Quite"
            }}
          </span>
        </div>
      </div>

      <div>
        <p class="text-sm font-bold text-primary uppercase tracking-widest mb-2">
          Quem paga quem
        </p>
        <p v-if="!split.debts.length" class="text-sm text-on-surface-variant">
          Ninguém deve nada por enquanto.
        </p>
        <div
          v-for="(d, i) in split.debts"
          :key="i"
          class="py-3 border-b border-outline-variant/10 space-y-2"
        >
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm text-white">
              <span class="font-bold">{{
                d.from === userId ? "Você" : nameOf(d.from)
              }}</span>
              {{ d.from === userId ? "deve" : "deve" }}
              <span class="text-primary font-bold">R$ {{ fmt(d.amount) }}</span>
              para
              <span class="font-bold">{{
                d.to === userId ? "você" : nameOf(d.to)
              }}</span>
            </p>
            <button
              v-if="d.from === userId || d.to === userId"
              @click="handleSettle(d)"
              class="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full whitespace-nowrap"
            >
              {{ d.from === userId ? "Já paguei" : "Recebi o Pix" }}
            </button>
          </div>
          <div
            v-if="d.from === userId"
            class="flex items-center gap-2 text-xs text-on-surface-variant"
          >
            <template v-if="pixOf(d.to)">
              Pix de {{ nameOf(d.to) }}:
              <span class="text-white font-mono break-all">{{ pixOf(d.to) }}</span>
              <button
                @click="copyPix(pixOf(d.to))"
                class="text-primary hover:underline"
              >
                copiar
              </button>
            </template>
            <template v-else>
              {{ nameOf(d.to) }} ainda não cadastrou a chave Pix.
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineEmits, computed } from "vue";

import Swal from "sweetalert2";
import { roleService } from "@/services/roles/roleService";
import { userService } from "@/services/users/userService";

const props = defineProps({
  roleId: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["open-modal", "refresh"]);

const itensList = ref([]);
const showSplit = ref(false);

const fmt = (v) =>
  Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 });

const nameOf = (uid) =>
  userService.formatName(
    props.data?.participants?.find((p) => p.uid === uid)?.displayName
  ) || "Alguém";

const split = computed(() => {
  const participants = props.data?.participants || [];
  const items = itensList.value;

  const paidItems = items.filter(
    (i) => i.isDone && i.responsibleId && Number(i.price) > 0
  );
  const payerIds = paidItems.map((i) => i.responsibleId);

  const people = participants.filter(
    (p) => p.status === "confirmed" || payerIds.includes(p.uid)
  );
  const ids = people.map((p) => p.uid);

  const total = paidItems.reduce((a, i) => a + Number(i.price), 0);
  const share = ids.length ? total / ids.length : 0;

  const paid = {};
  const sent = {};
  const received = {};
  ids.forEach((id) => {
    paid[id] = 0;
    sent[id] = 0;
    received[id] = 0;
  });
  paidItems.forEach((i) => {
    if (i.responsibleId in paid) paid[i.responsibleId] += Number(i.price);
  });
  (props.data?.settlements || []).forEach((s) => {
    if (s.from in sent) sent[s.from] += s.amount;
    if (s.to in received) received[s.to] += s.amount;
  });

  const rows = people.map((p) => {
    const balance =
      Math.round((paid[p.uid] - share + sent[p.uid] - received[p.uid]) * 100) /
      100;
    return {
      uid: p.uid,
      name: userService.formatName(p.displayName) || "Alguém",
      pixKey: p.pixKey || "",
      paid: paid[p.uid],
      share,
      balance,
    };
  });

  const creditors = rows
    .filter((r) => r.balance > 0.01)
    .map((r) => ({ uid: r.uid, v: r.balance }))
    .sort((a, b) => b.v - a.v);
  const debtors = rows
    .filter((r) => r.balance < -0.01)
    .map((r) => ({ uid: r.uid, v: -r.balance }))
    .sort((a, b) => b.v - a.v);

  const debts = [];
  let c = 0;
  let d = 0;
  while (c < creditors.length && d < debtors.length) {
    const amount = Math.round(Math.min(creditors[c].v, debtors[d].v) * 100) / 100;
    debts.push({ from: debtors[d].uid, to: creditors[c].uid, amount });
    creditors[c].v -= amount;
    debtors[d].v -= amount;
    if (creditors[c].v < 0.01) c++;
    if (debtors[d].v < 0.01) d++;
  }
  return { people: rows, total, share, debts };
});

const pixOf = (uid) =>
  props.data?.participants?.find((p) => p.uid === uid)?.pixKey || "";

async function copyPix(key) {
  try {
    await navigator.clipboard.writeText(key);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Chave Pix copiada!",
      showConfirmButton: false,
      timer: 1500,
      background: "#1e293b",
      color: "#f8fafc",
    });
  } catch (e) {
    console.error("Erro ao copiar:", e);
  }
}

async function handleSettle(debt) {
  const result = await Swal.fire({
    title: "Confirmar pagamento?",
    text: `R$ ${fmt(debt.amount)} de ${nameOf(debt.from)} para ${nameOf(debt.to)}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    background: "#1e293b",
    color: "#f8fafc",
  });
  if (!result.isConfirmed) return;
  if (await roleService.addSettlement(props.roleId, debt.from, debt.to, debt.amount)) {
    emit("refresh");
  }
}

async function handleDeleteItem(item) {
  const result = await Swal.fire({
    title: "Excluir item?",
    text: `"${item.name}" será removido da lista.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
    background: "#1e293b",
    color: "#f8fafc",
    confirmButtonColor: "#ef4444",
  });
  if (!result.isConfirmed) return;
  if (await roleService.deleteItemFromRole(props.roleId, item.id)) {
    itensList.value = itensList.value.filter((i) => i.id !== item.id);
  }
}

async function handleAbandonTask(item) {
  const result = await Swal.fire({
    title: "Largar tarefa?",
    text: `Outra pessoa poderá assumir "${item.name}".`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, largar",
    cancelButtonText: "Cancelar",
    background: "#1e293b",
    color: "#f8fafc",
  });
  if (!result.isConfirmed) return;
  if (await roleService.abandonItem(props.roleId, item.id)) {
    item.responsibleId = null;
    item.responsibleName = "Pode ser você =)";
    item.isDone = false;
  }
}

async function edit(item) {
  if (!props.isEditing && item.responsibleId !== props.userId) return;
  const result = await Swal.fire({
    title: `Valor de ${item.name}`,
    input: "number",
    inputValue: item.price || 0,
    inputAttributes: { step: "0.01", min: "0" },
    didOpen: (popup) => {
      const input = popup.querySelector(".swal2-input");
      if (input) {
        input.style.backgroundColor = "#0f172a";
        input.style.color = "#f8fafc";
        input.style.border = "1px solid #475569";
      }
    },
    showCancelButton: true,
    confirmButtonText: "Salvar",
    cancelButtonText: "Cancelar",
    background: "#1e293b",
    color: "#f8fafc",
  });
  if (!result.isConfirmed) return;
  const price = Number(result.value) || 0;
  if (await roleService.updateItemPrice(props.roleId, item.id, price)) {
    item.price = price;
  }
}

const opemModal = () => {
  emit("open-modal");
};

const totalPrice = computed(() => {
  return itensList.value.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    return acc + price;
  }, 0);
});

async function handleToggleItem(item, userId) {
  if (item.responsibleId !== userId) {
    return;
  }
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

async function handleVolunteer(item) {
  const updatedData = await roleService.volunteerForItem(props.roleId, item);

  if (updatedData) {
    item.responsibleId = updatedData.responsibleId;
    item.responsibleName = updatedData.responsibleName;
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
