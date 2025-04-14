<template>
  <div id="app">
    <AdminDashboard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminDashboard from './components/Admin_Dash.vue';

export default defineComponent({
  name: 'App',
  components: {
    AdminDashboard
  }
});
</script>

<style>
/* Reset and base styles */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}
</style>