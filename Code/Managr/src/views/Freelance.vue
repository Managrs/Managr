<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{ msg: string }>();

</script>

<template>
  <h1> Welcome to Freelancer</h1>
  <nav id="btnSec">
      <RouterLink to="/">Homepage</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/client">Client</RouterLink>
      <RouterLink to="/freelancer">Freelancer</RouterLink>
    </nav>
</template>

<style scoped>

#btnSec{
  display: flexbox;
}

button{
  margin: 1vw;
}

form{
  margin: 1vh;
  padding: 1vh;
}

h3{
  margin: 0;
  padding: 0;
}

</style>
