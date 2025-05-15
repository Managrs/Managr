<template>
  <main>
    <header>
      <h2>Sign Up</h2>
    </header>

    <form @submit.prevent="signup">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" required />
<br>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password" required />
<br>
      <fieldset>
        <legend>Select Role:</legend>
        <label>
          <input type="radio" value="user" v-model="role" />
          User
        </label>
        <label>
          <input type="radio" value="admin" v-model="role" />
          Admin
        </label>
      </fieldset>
<br>
      <button type="submit">Sign Up</button>
    </form>

    <footer>
      <p>
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </footer>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const role = ref('user')

function signup() {
  // Implement signup logic
  alert(`Signing up as ${email.value} with role: ${role.value}`)
}
</script>

<style scoped>
main {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
</style>
