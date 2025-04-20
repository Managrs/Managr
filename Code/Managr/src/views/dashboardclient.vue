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

<script setup lang="ts">
import DashClient from '../components/DashClient.vue'
import ProfileView from '../components/ProfileView.vue'
import SearchComponent from '../components/SearchComponent.vue'

// Component name declaration (Vue 3.3+)
defineOptions({
  name: 'DashboardClient'
})
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.freelancer-section {
  width: 100vw;
  padding: 2rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
}
</style>