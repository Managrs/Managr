<template>
    <section class="dashboard-layout">
      <AdminSide />
      <main class="dashboard-content">
        <router-view />
      </main>
    </section>
  </template>
  
  <script lang="ts">
  import AdminSide from '../components/AdminSide.vue';
import { useAuth0 } from '@auth0/auth0-vue'
import { useUserStore } from '../stores/userStore'

export default {
  name: "dashboardadmin",
  components: {
    AdminSide
  },
  mounted() {
    const { isAuthenticated, isLoading, user } = useAuth0()
    const userStore = useUserStore()

    if (!isLoading.value && isAuthenticated.value && user.value) {
      userStore.setUser(user.value)
    }
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
  