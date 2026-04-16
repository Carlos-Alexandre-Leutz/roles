<template>
  <div>
    <!-- autenitcado -->
    <div v-if="true">
      <menuComponent>
        <RouterView />
      </menuComponent>
    </div>
    <!-- não autenticado -->
    <div v-if="false">
      <RouterView />
    </div>
  </div>
</template>
<script>
import menuComponent from './components/layout/menuComponent.vue';

export default {
  components: {
    menuComponent
  },
}
</script>


