<template>
  <section class="page-container">
    <DashClient/>
    <router-view/>
    <section class="freelancer-section">
      <ProfileView />
    </section>
  </section>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '../stores/userStore';

import DashClient from '../components/DashClient.vue';
import ProfileView from '../components/ProfileView.vue';

export default {
  name: "dashboardclient",
  components: {
    DashClient,
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


<style scoped>
.freelancer-section {
  width: 100vw;
  padding: 2rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
}
</style>
