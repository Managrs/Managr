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
import DashClient from '../components/DashClient.vue';
import ProfileView from '../components/ProfileView.vue';

import { useAuth0 } from '@auth0/auth0-vue'
import { useUserStore } from '../stores/userStore'

export default {
  name: "dashboardclient",
  components: {
    DashClient,
    ProfileView
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
.freelancer-section {
  width: 100vw;
  padding: 2rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
}
</style>
