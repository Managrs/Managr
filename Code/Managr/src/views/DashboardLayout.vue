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

  }
}
  </script>