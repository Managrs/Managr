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
  import { watch } from 'vue';
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

    watch(
      [isLoading, isAuthenticated, user],
      ([loading, auth, userData]) => {
        if (!loading && auth && userData) {
            console.log('loading:', loading)
            console.log('auth:', auth)
          console.log('User from Auth0:', userData)
          userStore.setUser({
            name: userData.name || 'Guest User',
            email: userData.email || 'guestuser@gmail.com',
            avatar: userData.picture || '/profile.jpg',
          })
        }
      },
      { immediate: true }
    );
  }
}
  </script>