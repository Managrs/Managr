<template>
    <header class="header">
      <nav class="navigation">
        <!-- Left Side - Logo -->
        <a href="#" class="logo-link" aria-label="Managr - Home">
          <img 
            src="/brandlogo.png" 
            alt="Managr" 
            class="logo-image"
            width="120" 
            height="40"
          >
        </a>
  
        <!-- Right Side - Links + User Avatar -->
        <section class="user-section">
          <ul class="nav-links">
            <li>
              <router-link to="/managegig" class="nav-link">Manage Gigs</router-link>
            </li>
            <li>
              <router-link to="/makeReport" class="nav-link">Make Report</router-link>
            </li>
            <li>
              <router-link to="/postgig" class="nav-link">Post Gig</router-link>
            </li>

            <li> 
              <router-link to="/contractform" class="nav-link"> Contract</router-link>
            </li>

            <li>
              <router-link to="/chatsystem" class="nav-link">Messages</router-link>
            </li>
          </ul>
          <figure class="user-avatar" @click="toggleSidebar">
            <a href="#">
              <img :src="userStore.avatar" alt="User Avatar" class="avatar-image" />
            </a>
          </figure>
        </section>
      </nav>
    </header>
    <UserSidebar v-if="isOpen" @close="toggleSidebar" />
  </template>  

  
<script lang="ts">
  import { useUserStore } from '../stores/userStore';
  import UserSidebar from '../views/userProfile.vue';


  export default {
    name: 'DashClient',
    components: {
      UserSidebar
    },
    data() {
      const userStore = useUserStore();
      return {
        isOpen: false,
        userStore
      }
    },
    methods: {
      toggleSidebar() {
        this.isOpen = !this.isOpen; 
      }
    }
  }
</script>
  
<style scoped>
/* Global Variables */
:root {
  --color-primary: #007BFF;
  --color-white: #ffffff;
  --color-border: #e0e0e0;
  --color-light-gray: #f3f3f3;
  --color-dark-gray: #333333;
}

/* Header Styling */
.header {
  display: flex;
  justify-content: center; /* Centers the content */
  align-items: center;
  position: relative;
  height: 80px; /* Increased height for better spacing */
  padding: 0 30px; /* Increased padding */
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
}

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 1.5rem;
  z-index: 10;
}

.logo-link {
  text-decoration: none;
}

/* Pushes user-section (with nav links + avatar) to the right */
.user-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

/* Updated nav-links layout for inline display */
.nav-links {
  display: flex;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: inline-block;
  padding: 8px 18px;
  border: 1px solid black;
  border-radius: 6px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: #ffffff;
  background: #000000;
  white-space: nowrap;
}

.nav-link:hover {
  background: #e77e23;
  color: #ffffff;
}

/* Avatar */
.user-avatar {
  width: 35px;
  height: 35px;
  background: var(--color-light-gray);
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
  