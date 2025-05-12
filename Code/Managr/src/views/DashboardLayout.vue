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
  
<script setup lang="ts">
import DashNavbar from '../components/DashNavbar.vue'
import CategoryView from '../components/CategoryView.vue'
import ProfileView from '../components/ProfileView.vue'

import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'

const { isAuthenticated, isLoading, user } = useAuth0()
const userStore = useUserStore()

onMounted(() => {
  if (!isLoading.value && isAuthenticated.value && user.value) {
    userStore.setUser(user.value)
  }
})
</script>
