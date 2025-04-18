<template>
  <section class="page-container">
    <DashClient/>
    <main>
      <SearchComponent />
    </main>
    <router-view/>
    <section class="freelancer-section">
      <ProfileView />
    </section>
  </section>
</template>

<script lang="ts">
import DashClient from '../components/DashClient.vue';
import ProfileView from '../components/ProfileView.vue';
import SearchComponent from '../components/SearchComponent.vue';

export default {
  name: "dashboardclient",
  components: {
    DashClient,
    ProfileView,
    SearchComponent
  }
}
</script>

<style scoped>
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Make ProfileView full width */
.freelancer-section {
  width: 100vw;
  padding: 2rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center; /* centers content horizontally */
}
</style>
