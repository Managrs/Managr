<template>
    <section class="dashboard">
      <DashNavbar />
      <main class="dashboard-body">
        <router-view/>
        <CategoryView />
        <ProfileView />
      </main>
    </section>
</template>
  
  <script lang="ts">
  import { onMounted } from 'vue';
  import { useAuth0 } from '@auth0/auth0-vue';
  import { useUserStore } from '../stores/userStore';

  import DashNavbar from '../components/DashNavbar.vue'
  import CategoryView from '../components/CategoryView.vue'
  import ProfileView from '../components/ProfileView.vue'

  
export default {
  name: "dashboardfreelance",
  components: {
    DashNavbar,
    CategoryView,
    ProfileView
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