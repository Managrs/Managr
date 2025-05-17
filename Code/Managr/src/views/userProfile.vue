<template>
  <aside v-if="isOpen" class="sidebar" @mouseenter="openSidebar" @mouseleave="closeSidebar">
    <section class="sidebar-header">
      <img class="avatar" :src="userStore.avatar" alt="User Avatar" />
      <section class="user-info">
        <h2>{{ userStore.name }}</h2>
        <p>{{ userStore.email }}</p>
      </section>
    </section>

    <footer class="sidebar-footer">
      <button @click="handleLogout">Logout</button>
    </footer>
  </aside>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { signOut, getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';




export default {
  name: 'userProfile',
  setup() {
    const userStore = useUserStore();
    const { clearUser } = userStore;
    const router = useRouter();

const handleLogout = () => {
      signOut(getAuth())
        .then(() => {
          clearUser();
          console.log("User Cleared");
          router.push('/login');
          console.log("Sign out done");
        });
    };

    const isOpen = ref(true);
  

    const openSidebar = () => {
      isOpen.value = true;
    };

    const closeSidebar = () => {
      isOpen.value = false;
    };

    return {
      isOpen,
      userStore,
      handleLogout,
      openSidebar,
      closeSidebar,
    };
  },
};
</script>


<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 80%;
  max-height: 600px;
  background-color: white;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.user-info h2 {
  margin: 0;
  font-size: 1.9rem;
  text-align: center;
}

.user-info p {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}

.sidebar-footer {
  padding-top: 1rem;
}

.sidebar-footer button {
  background-color: #080201;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.sidebar-footer button:hover {
  background-color: #220d0b;
}
</style>
