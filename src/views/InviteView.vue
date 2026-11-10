<template>
  <div class="bg-surface text-on-surface font-body min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-md rounded-3xl p-8 border border-outline-variant/15 bg-surface-container-high/60 text-center space-y-6">
      <div class="text-2xl font-black tracking-tighter text-white uppercase font-headline">ROLES</div>

      <p v-if="state === 'loading'" class="text-on-surface-variant">Carregando convite...</p>

      <template v-else-if="state === 'login'">
        <h1 class="text-3xl font-extrabold font-headline">Você foi convidado para um rolê! 🎉</h1>
        <p class="text-on-surface-variant text-sm">Entre ou crie sua conta para ver os detalhes e confirmar presença.</p>
        <div class="space-y-3">
          <RouterLink :to="{ name: 'login', query: { redirect: route.fullPath } }" class="block">
            <button class="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold py-4 rounded-full">
              Entrar
            </button>
          </RouterLink>
          <RouterLink :to="{ name: 'register', query: { redirect: route.fullPath } }" class="block">
            <button class="w-full bg-surface-variant/20 font-semibold py-4 rounded-full border border-outline-variant/15">
              Criar conta
            </button>
          </RouterLink>
        </div>
      </template>

      <template v-else-if="state === 'ready' && role">
        <h1 class="text-3xl font-extrabold font-headline">{{ role.title }}</h1>
        <div class="text-on-surface-variant space-y-1 text-sm">
          <p v-if="role.eventDateTime">📅 {{ formatEventDate(role.eventDateTime) }}</p>
          <p v-if="role.address">📍 {{ role.address }}</p>
        </div>
        <button
          @click="join"
          :disabled="joining"
          class="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold py-4 rounded-full disabled:opacity-60"
        >
          {{ joining ? "Entrando..." : "Entrar no rolê" }}
        </button>
      </template>

      <template v-else>
        <h1 class="text-2xl font-extrabold font-headline">Convite indisponível</h1>
        <p class="text-on-surface-variant text-sm">Esse rolê não existe mais ou o link está errado.</p>
        <RouterLink to="/dashboard" class="text-primary font-bold hover:underline">Ir para o painel</RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase.ts";
import { roleService } from "@/services/roles/roleService.ts";

const route = useRoute();
const router = useRouter();
const roleId = route.params.id;

const state = ref("loading"); // loading | login | ready | missing
const role = ref(null);
const joining = ref(false);

const formatEventDate = (value) => {
  const date = value?.toDate ? value.toDate() : new Date(value);
  return isNaN(date) ? "" : date.toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "short" });
};

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    unsubscribe();
    if (!user) {
      state.value = "login";
      return;
    }
    const preview = await roleService.getInvitePreview(roleId);
    if (!preview) {
      state.value = "missing";
    } else if (preview.alreadyIn) {
      router.replace({ name: "view-role", params: { id: roleId } });
    } else {
      role.value = preview.role;
      state.value = "ready";
    }
  });
});

const join = async () => {
  joining.value = true;
  const ok = await roleService.joinViaInvite(roleId);
  joining.value = false;
  if (ok) router.replace({ name: "view-role", params: { id: roleId } });
};
</script>
