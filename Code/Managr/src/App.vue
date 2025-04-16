<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AdminDashboard from './components/Admin_Dash.vue';
import { defineComponent } from 'vue';
</script>

<template>
  <!--<nav id="btnSec">
      <RouterLink to="/">Homepage</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/client">Client</RouterLink>
      <RouterLink to="/freelancer">Freelancer</RouterLink>
    </nav>-->
  <RouterView />
  <section>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </section>
  <HelloWorld msg="Lebo + Lemo" />
</template>

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
