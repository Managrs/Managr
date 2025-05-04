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

export default {
  name: "dashboardclient",
  components: {
    DashClient,
    ProfileView
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
