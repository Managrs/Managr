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
// import { onMounted } from 'vue';
// import { useAuth0 } from '@auth0/auth0-vue';
// import { useUserStore } from '../stores/userStore';

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
<<<<<<< HEAD
  mounted() {
    const { isAuthenticated, isLoading, user } = useAuth0()
    const userStore = useUserStore()

    if (!isLoading.value && isAuthenticated.value && user.value) {
      userStore.setUser(user.value)
    }
=======
  setup() {
    // const { user, isAuthenticated, isLoading } = useAuth0();
    // const userStore = useUserStore();

    // onMounted(() => {
    //   if (!isLoading.value && isAuthenticated.value && user.value) {
    //     console.log('User from Auth0:', user.value);
    //     userStore.setUser({
    //       name: user.value.name || 'Guest User',
    //       email: user.value.email || 'guestuser@gmail.com',
    //       avatar: user.value.picture || '/profile.jpg' ,
    //     });
    //   }
    // });
>>>>>>> ae025d5794dcfbb8be0425c90d158cccb8a6debb
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
