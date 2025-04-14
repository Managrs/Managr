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
/* Global styles if needed */
</style>