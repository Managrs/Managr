<template>
  <main>
    <div class="card" v-if="email">
      <header>
        <h2>Dashboard</h2>
      </header>

      <section>
        <figure class="avatar-block">
          <img :src="avatar" alt="User Avatar" class="avatar" />
          <figcaption>{{ name }}</figcaption>
        </figure>
        <p><strong>Name:</strong> {{ name }}</p>
        <p><strong>Email:</strong> {{ email }}</p>

        <nav>
          <button @click="logout">Logout</button>
        </nav>
      </section>
    </div>

    <div class="card" v-else>
      <p>You are not logged in.</p>
      <router-link to="/login">Go to Login</router-link>
    </div>
  </main>
</template>


<script setup lang="ts">
import { useUserStore } from '../../stores/userStore';
import { signOut,getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;
  padding: 1rem;
}

.card {
  background-color: #fff;
  border: 2px solid #f57c00;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header h2 {
  color: #f57c00;
  margin-bottom: 1.5rem;
}

.avatar-block {
  margin-bottom: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #f57c00;
  object-fit: cover;
}

p {
  color: #212121;
  margin: 0.5rem 0;
}

strong {
  color: #000;
}

button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #f57c00;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #ef6c00;
}

a {
  color: #f57c00;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>

