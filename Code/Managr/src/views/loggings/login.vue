<template>
  <main>
    <header>
      <h2>Login</h2>
    </header>

    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" required />
        <br>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password" required />
<br>
      <button type="submit">Login</button>
    </form>

    <footer>
      <p>
        Don't have an account?
        <router-link to="/signup">Sign up here</router-link>
      </p>
    </footer>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function login() {
  // Implement login logic
  alert(`Logging in as ${email.value}`)
}
</script>

<style scoped>
main {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
</style>
