<template>
  <div v-if="needsVerify">
    <div class="h-20 sm:h-14"></div>
    <div
      class="fixed left-0 lg:left-64 right-0 top-[4.5rem] z-30 h-20 sm:h-14 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1 sm:gap-4 bg-amber-500/15 border-b border-amber-500/30 backdrop-blur"
    >
      <p class="text-xs sm:text-sm text-amber-200">
        Confirme seu e-mail para receber avisos dos rolês. Veja a caixa de
        entrada (e o spam).
      </p>
      <div class="flex items-center gap-3 text-xs sm:text-sm font-bold">
        <button
          @click="resend"
          :disabled="busy"
          class="text-amber-300 hover:underline disabled:opacity-50"
        >
          Reenviar e-mail
        </button>
        <button
          @click="check(true)"
          :disabled="busy"
          class="px-3 py-1 rounded-full bg-amber-400 text-black disabled:opacity-50"
        >
          Já confirmei
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Swal from "sweetalert2";
import { userService } from "@/services/users/userService";

const needsVerify = ref(false);
const busy = ref(false);
const dark = { background: "#1e293b", color: "#f8fafc" };

async function check(manual = false) {
  busy.value = true;
  try {
    const verified = await userService.syncEmailVerified();
    needsVerify.value = !verified;
    if (manual && !verified) {
      Swal.fire({
        ...dark,
        icon: "info",
        title: "Ainda não confirmado",
        text: "Clique no link do e-mail que enviamos e tente de novo.",
      });
    } else if (manual && verified) {
      Swal.fire({
        ...dark,
        toast: true,
        position: "top-end",
        icon: "success",
        title: "E-mail confirmado!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.error("Erro ao verificar e-mail:", e);
  } finally {
    busy.value = false;
  }
}

async function resend() {
  busy.value = true;
  try {
    await userService.sendVerificationEmail();
    Swal.fire({
      ...dark,
      icon: "success",
      title: "E-mail enviado",
      text: "Confira a caixa de entrada e o spam.",
    });
  } catch (e) {
    console.error("Erro ao reenviar confirmação:", e);
    Swal.fire({
      ...dark,
      icon: "error",
      title: "Ops!",
      text: "Aguarde um pouco e tente de novo.",
    });
  } finally {
    busy.value = false;
  }
}

const onFocus = () => needsVerify.value && check(false);

onMounted(() => {
  check(false);
  window.addEventListener("focus", onFocus);
});
onBeforeUnmount(() => window.removeEventListener("focus", onFocus));
</script>
