<template>
  <div class="max-w-2xl mx-auto px-6 pt-28 pb-12 space-y-8">
    <h1 class="text-4xl font-headline font-extrabold text-white">
      Minha <span class="text-primary">Conta</span>
    </h1>

    <p v-if="loading" class="text-on-surface-variant">Carregando...</p>

    <form v-else @submit.prevent="save" class="space-y-6">
      <div
        class="glass-panel p-8 rounded-[2rem] border border-outline-variant/10 space-y-6"
      >
        <div class="flex items-center gap-4">
          <img
            v-if="form.photoURL"
            :src="form.photoURL"
            alt="Avatar"
            class="w-16 h-16 rounded-full object-cover"
          />
          <div
            v-else
            class="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold uppercase"
          >
            {{ (form.displayName || "?").charAt(0) }}
          </div>
          <div class="min-w-0">
            <p class="text-white font-bold truncate">
              {{ formatName(form.displayName) }}
            </p>
            <p class="text-sm text-on-surface-variant truncate">
              {{ email }}
            </p>
          </div>
        </div>

        <label class="block space-y-2">
          <span class="text-sm font-bold text-on-surface-variant ml-1">Nome</span>
          <input
            v-model="form.displayName"
            required
            class="w-full bg-surface-container-high border-none rounded-2xl py-4 px-6 text-on-surface focus:ring-2 focus:ring-primary/50"
            type="text"
          />
        </label>

        <div class="space-y-2">
          <span class="text-sm font-bold text-on-surface-variant ml-1">Foto</span>
          <div class="flex gap-3">
            <label
              class="px-5 py-3 rounded-full border border-outline-variant/30 text-white text-sm font-bold hover:bg-white/5 transition-colors cursor-pointer"
            >
              Escolher foto
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="pickPhoto"
              />
            </label>
            <button
              v-if="form.photoURL"
              type="button"
              @click="form.photoURL = ''"
              class="px-5 py-3 rounded-full text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Remover
            </button>
          </div>
          <span class="text-xs text-on-surface-variant ml-1">
            A imagem é recortada em quadrado e reduzida automaticamente.
          </span>
        </div>

        <label class="block space-y-2">
          <span class="text-sm font-bold text-on-surface-variant ml-1"
            >Chave Pix</span
          >
          <input
            v-model="form.pixKey"
            class="w-full bg-surface-container-high border-none rounded-2xl py-4 px-6 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/50"
            placeholder="CPF, e-mail, telefone ou chave aleatória"
            type="text"
          />
          <span class="text-xs text-on-surface-variant ml-1">
            Aparece para quem te deve na divisão de contas.
          </span>
        </label>

        <label class="flex items-center justify-between gap-4 cursor-pointer">
          <span>
            <span class="block text-sm font-bold text-white"
              >Receber avisos por e-mail</span
            >
            <span class="block text-xs text-on-surface-variant"
              >Convites, tarefas e pagamentos também chegam em {{ email }}.</span
            >
          </span>
          <input
            v-model="form.emailNotifications"
            type="checkbox"
            class="w-5 h-5 rounded accent-[#db90ff]"
          />
        </label>

        <button
          type="submit"
          :disabled="saving"
          class="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-extrabold active:scale-95 transition-all disabled:opacity-50"
        >
          {{ saving ? "Salvando..." : "Salvar alterações" }}
        </button>
      </div>

      <div
        class="glass-panel p-8 rounded-[2rem] border border-outline-variant/10 space-y-4"
      >
        <h2 class="text-xl font-headline font-bold text-white">Segurança</h2>
        <p class="text-sm text-on-surface-variant">
          Enviamos um link para {{ email }} para você criar uma nova senha.
        </p>
        <button
          type="button"
          @click="resetPassword"
          class="px-6 py-3 rounded-full border border-outline-variant/30 text-white font-bold hover:bg-white/5 transition-colors"
        >
          Redefinir senha
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { userService } from "@/services/users/userService";

const loading = ref(true);
const saving = ref(false);
const email = ref("");
const form = ref({
  displayName: "",
  photoURL: "",
  pixKey: "",
  emailNotifications: true,
});

const formatName = (n) => userService.formatName(n);
const dark = { background: "#1e293b", color: "#f8fafc" };

onMounted(async () => {
  try {
    const profile = await userService.getMyProfile();
    email.value = profile.email;
    form.value = {
      displayName: userService.formatName(profile.displayName),
      photoURL: profile.photoURL || "",
      pixKey: profile.pixKey || "",
      emailNotifications: profile.emailNotifications !== false,
    };
  } finally {
    loading.value = false;
  }
});

async function pickPhoto(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  try {
    form.value.photoURL = await userService.resizeImage(file);
  } catch (e) {
    console.error("Erro ao processar foto:", e);
    Swal.fire({ ...dark, title: "Erro", text: "Escolha um arquivo de imagem válido.", icon: "error" });
  }
}

async function save() {
  saving.value = true;
  try {
    await userService.updateMyProfile(form.value);
    window.dispatchEvent(new Event("profile-updated"));
    Swal.fire({
      ...dark,
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Perfil atualizado!",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (e) {
    console.error("Erro ao salvar perfil:", e);
    Swal.fire({ ...dark, title: "Erro", text: "Não foi possível salvar.", icon: "error" });
  } finally {
    saving.value = false;
  }
}

async function resetPassword() {
  try {
    const sentTo = await userService.sendPasswordReset();
    Swal.fire({
      ...dark,
      title: "E-mail enviado",
      text: `Confira a caixa de entrada de ${sentTo}.`,
      icon: "success",
    });
  } catch (e) {
    console.error("Erro ao redefinir senha:", e);
    Swal.fire({ ...dark, title: "Erro", text: "Não foi possível enviar o e-mail.", icon: "error" });
  }
}
</script>

<style>
.glass-panel {
  background: rgba(32, 31, 31, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
</style>
