<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const { loginWithRedirect } = useAuth0();
const { logout } = useAuth0();

const userType = ref<string>('');

const handleLogout = () => {
  logout({ returnTo: window.location.origin });
};

defineProps<{ msg: string }>();

</script>

<template>
  <h1> Welcome to login</h1>
  <nav id="btnSec">
      <RouterLink to="/">Homepage</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/client">Client</RouterLink>
      <RouterLink to="/freelancer">Freelancer</RouterLink>
    </nav>
  <section id="btnSec">
    <form>
        <h3>Type of User:</h3>
        <label>
          <input type="radio" name="option" value="Admin" v-model="userType">
          Admin
        </label>
        <label>
          <input type="radio" name="option" value="Freelancer" v-model="userType">
            Freelancer
        </label>

        <label>
          <input type="radio" name="option" value="Client" v-model="userType">
            Client
        </label>
    </form>

    <button @click="loginWithRedirect">Log in</button>

    <button @click="handleLogout">Log out</button>
    <p>Selected User Type: {{ userType }}</p>
  </section>
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
