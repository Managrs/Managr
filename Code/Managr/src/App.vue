<template>
  <section class="dashboard">
  <DashNavbar/>
  <main class="dashboard-body">
      <CategoryView />
      <br />
      <ProfileView />
    </main>
  </section>
</template>

<script setup lang="ts">
import DashNavbar from './components/DashNavbar.vue';
import CategoryView from './components/CategoryView.vue';
import ProfileView from './components/ProfileView.vue';

</script>
