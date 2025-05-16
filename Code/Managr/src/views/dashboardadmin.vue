<template>
    <section class="dashboard-layout">
      <AdminSide />
      <main class="dashboard-content">
        <router-view />
      </main>
    </section>
  </template>
  <script lang="ts">
<<<<<<< HEAD
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
=======
// import { onMounted } from 'vue';
// import { useAuth0 } from '@auth0/auth0-vue';
// import { useUserStore } from '../stores/userStore';
import AdminSide from '../components/AdminSide.vue';

export default {
  name: "dashboardadmin",
  components: {
    AdminSide
  },
  setup() {
    // const { user, isAuthenticated, isLoading } = useAuth0();
    // const userStore = useUserStore();

    // onMounted(() => {
    //   if (!isLoading.value && isAuthenticated.value && user.value) {
    //     console.log('User from Auth0:', user.value);
    //     userStore.setUser({
    //       name: user.value.name || 'Guest User',
    //       email: user.value.email || 'guestuser@gmail.com',
    //       avatar: user.value.picture || '/profile.jpg',
    //     });
    //   }
    // });
>>>>>>> ae025d5794dcfbb8be0425c90d158cccb8a6debb
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
  