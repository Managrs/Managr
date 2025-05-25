<template>
    <aside class="sidebar">
      <!-- Logo -->
      <figure class="project-logo">
        <img
          src="/brandlogo.png"
          alt="Managr"
          class="logo-image"
          width="120"
          height="40"
        />
      </figure>
  
      <section class="admin-section">
        <ul class="nav-links">
          <li><router-link to="/Ausers" class="nav-link">Users</router-link></li>
          <li><router-link to="/Areports" class="nav-link">Reports</router-link></li>
          <li><router-link to="/Aproducts" class="nav-link">Products</router-link></li>
          <li><router-link to="/Aorders" class="nav-link">Orders</router-link></li>
        </ul>
      </section>
  
      <!-- Bottom Profile Section -->
    <section class="bottom-profile" @click="toggleSidebar">
    <router-link to="/Aprofile" class="profile-link">
    <img
      :src="userStore.avatar"
      alt="User Avatar"
      class="avatar-image"
    />
    <article class="admin-name">{{ userStore.name }}</article>
    </router-link>
    </section>
    </aside>
    <UserSidebar v-if="isOpen" @close="toggleSidebar" />
    <!--<main class="main-view">-->
      <!--<router-view />-->
    <!--</main>-->
  </template>
  
  <script lang="ts">
  import UserSidebar from '../views/userProfile.vue';
  import { useUserStore } from '../stores/userStore';

  export default {
    name: "Adminside",
    components: {
      UserSidebar
    },
    data() {
      const userStore = useUserStore(); 
      return {
        isOpen: false ,
        userStore
      }
    },
    methods: {
      toggleSidebar() {
        this.isOpen = !this.isOpen; // Toggle sidebar visibility
      }
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    border-right: 1px solid #dcdfd4;
    padding: 1rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
    z-index: 1000;
  }
  
  .project-logo {
    margin-bottom: 1rem;
    margin-left: 0%;
  }
  
  .logo-image {
    max-width: 100%;
    height: auto;

  }
  
  .admin-section {
    flex-grow: 1;
    margin-top: 0.5rem;
  }
  
  .nav-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-link {
    display: block;
    padding: 0.6rem 1rem;
    color: #374151;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .nav-link:hover {
    background-color: #e77e23;
    color: #111827;
  }
  
  /* Vue Router active link styling */
  .router-link-active {
    background-color: #e5e7eb;
    font-weight: 600;
    color: #111827;
  }
  
  .bottom-profile {
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  transform: translateY(-25px); /* nudges the whole section up by 1px */
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #374151;
  padding: 0.6rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}

.profile-link:hover {
  background-color: #e77e23;
}

.avatar-image {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  object-fit: cover;
}

.admin-name {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
  