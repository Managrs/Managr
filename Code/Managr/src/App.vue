<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div id="app">
    <AdminDashboard />
  </div>
  <!--<nav id="btnSec">
      <RouterLink to="/">Homepage</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/client">Client</RouterLink>
      <RouterLink to="/freelancer">Freelancer</RouterLink>
    </nav>-->
  <RouterView />
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
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#btnSec{
  display: flex;
  justify-content: space-between;
}

</style>
