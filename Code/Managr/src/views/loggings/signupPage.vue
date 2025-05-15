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
          <p v-if="errorMsg">  {{ errorMsg }} </p>
          <br>
      <p>
        Already have an account?
        <br>
        <router-link to="/login">Login here</router-link>
      </p>
    </footer>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import router from '../../router';

const email = ref('');
const password = ref('');
const role = ref('user');
const errorMsg = ref('');


function signup() {
  // Implement signup logic
  alert(`Signing up as ${email.value} with role: ${role.value}`);

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) => {
    console.log("Successfully registering!");
    router.push("/display")
  })
  .catch((error) => {
    console.log(error.message);
    switch (error.code) {
      case "auth/invalid-email":
        errorMsg.value = "Invaild Email";
        break;

      case "auth/user-not-found":
        errorMsg.value = "No account with email found";
        break;

      case "auth/wrong-password":
        errorMsg.value = "Incorrect Password";
        break;
      case "auth/email-already-in-use":
        errorMsg.value = "This email is already used";
        break;
    
      default:
        errorMsg.value = "Something went wrong check input";
        break;
      }
  })
}
</script>

<style scoped>
main {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
</style>
