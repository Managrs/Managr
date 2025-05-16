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
import { watchEffect } from 'vue';
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

watchEffect(() => {
    if (!isLoading.value && isAuthenticated.value && user.value){
        console.log('loading:', isLoading.value)
        console.log('auth:', isAuthenticated.value)
      console.log('User from Auth0:', user.value)
      userStore.setUser({
        name: user.value.name || 'Guest User',
        email: user.value.email || 'guestuser@gmail.com',
        avatar: user.value.picture || '/profile.jpg',
      })
    } else {
      console.log('⏳ Waiting for Auth0 to load...');
      console.log('loading:', isLoading.value);
      console.log('auth:', isAuthenticated.value);
      console.log('User from Auth0:', user.value);
  }
  }
);
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
