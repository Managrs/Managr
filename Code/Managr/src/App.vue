<script setup lang="ts">

</script>

<template>
  <!--<nav id="btnSec">
      <RouterLink to="/">Homepage</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/client">Client</RouterLink>
      <RouterLink to="/freelancer">Freelancer</RouterLink>
    </nav>-->
  <RouterView />
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
