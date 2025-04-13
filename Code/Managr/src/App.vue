<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <nav id="btnSec">
      <RouterLink to="/">Homepage</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/client">Client</RouterLink>
      <RouterLink to="/freelancer">Freelancer</RouterLink>
    </nav>
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#btnSec{
  display: flex;
  justify-content: space-between;
}
</style>
