<template>
  <main>
    <header>
      <h2>Dashboard</h2>
    </header>

    <section v-if="email">
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <figure>
        <img :src="avatar" alt="User Avatar" width="100" />
        <figcaption>{{ name }}</figcaption>
      </figure>
      <nav>
        <button @click="logout">Logout</button>
      </nav>
    </section>

    <section v-else>
      <p>You are not logged in.</p>
      <router-link to="/login">Go to Login</router-link>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/userStore';
import { signOut,getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const { name, email, avatar, clearUser } = userStore
const router = useRouter()

function logout() {
  signOut(getAuth())
  .then(() => {
    clearUser();
    console.log("User Cleared");
    router.push('/login');
    console.log("Sign out done");
  });

}
</script>

<style scoped>
main {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}

img {
  border-radius: 50%;
}
</style>
