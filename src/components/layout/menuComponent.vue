<template>
  <div class="bg-surface text-on-surface">
    <sideBar></sideBar>
    <headerComponent>
      <slot></slot>
    </headerComponent>
  </div>
</template>
<script>
import headerComponent from "./components/headerComponente.vue";
import sideBar from './components/sideBar.vue';

export default {
  components: {
    headerComponent,
    sideBar
  },
}
</script>
<style>
body {
  font-family: "Manrope", sans-serif;
}
.font-headline {
  font-family: "Plus Jakarta Sans", sans-serif;
}
.glass-card {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
.neon-glow {
  box-shadow: 0 0 40px -10px rgba(219, 144, 255, 0.15);
}
.atmospheric-glow {
  box-shadow: 0 0 64px rgba(219, 144, 255, 0.08);
}
.no-border {
  border: none !important;
}
.tonal-transition {
  transition: background-color 0.3s ease;
}
</style>