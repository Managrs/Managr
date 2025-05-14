<template>
    <section class="dashboard-layout">
      <AdminSide />
      <main class="dashboard-content">
        <router-view />
      </main>
    </section>
  </template>
  <script lang="ts">
import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '../stores/userStore';
import AdminSide from '../components/AdminSide.vue';

export default {
  name: "dashboardadmin",
  components: {
    AdminSide
  },
  setup() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const userStore = useUserStore();

    onMounted(() => {
      if (isAuthenticated.value && !isLoading.value && user.value) {
        userStore.setUser({
          name: user.value.name || '',
          email: user.value.email || '',
          avatar: user.value.picture || '../assets/profile.png',
        });
      }
    });
  }
}
  </script>

  <style scoped>
  .dashboard-layout {
    display: flex;
    height: 100vh;
  }
  
  .dashboard-content {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  background-color: #f5f5f5;
  padding: 2.7rem;
  margin-left: 250px;
}
  </style>
  