<template>
    <aside v-if="isOpen" class="sidebar" @mouseenter="openSidebar" @mouseleave="closeSidebar">
      <section class="sidebar-header">
        <img class="avatar" :src="user?.avatar" alt="User Avatar" />
        <section class="user-info">
          <h2>{{ user?.name }}</h2>
          <p>{{ user?.email }}</p>
        </section>
      </section>
  
      <nav class="sidebar-links">
        <ul>
          <li><a href="#">Personal Settings</a></li>
          <li><a href="#">Notifications</a></li>
          <li><a href="#">Language</a></li>
          <li><a href="#">Members</a></li>
        </ul>
      </nav>
  
      <footer class="sidebar-footer">
        <button @click="handleLogout">Logout</button>
      </footer>
    </aside>
  </template>
  
  <script lang="ts">
  import { ref,onMounted } from 'vue';
  import { useUserStore } from '../stores/userStore';
  import { useAuth0 } from '@auth0/auth0-vue';
  
  export default {
    name: 'userProfile',
    setup() {
      const { logout, user, isAuthenticated ,getAccessTokenSilently } = useAuth0();
      const userStore = useUserStore();
  
      const isOpen = ref(true);
      onMounted(async () => {
      if (isAuthenticated.value && user.value) {
        userStore.setUser({
          name: user.value.name || "Not Authorized",
          email: user.value.email || "noauthorized@gmail.com",
          avatar: user.value.picture || "https://lh3.googleusercontent.com/a/ACg8ocKmQO4N2r-zqaOAMI4QcI5H6hp6xkn4VHwepUp66i_DW2tjow=s96-c",
        });

        // If you want to get a token:
        try {
          const token = await getAccessTokenSilently();
          console.log('Access Token:', token);
        } catch (e) {
          console.error('Token error:', e);
        }
      }
    });

      const handleLogout = () => {
        logout({
          logoutParams: { returnTo: window.location.origin },
        });
      };
  
      const openSidebar = () => {
        isOpen.value = true;
      };
  
      const closeSidebar = () => {
        isOpen.value = false;
      };
  
      return {
        isOpen,
        user,
        handleLogout,
        openSidebar,
        closeSidebar,
      };
    },
  };
  </script>
  
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 80%; /* Set the height to 80% of the screen */
    max-height: 600px; /* Ensure it doesn't exceed 600px in height */
    background-color: white;
    border-left: 1px solid #ddd;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .sidebar-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem; /* Adjusted gap for better spacing */
  }
  
  .avatar {
    width: 80px; /* Increased size */
    height: 80px; /* Increased size */
    border-radius: 50%;
  }
  
  .user-info h2 {
    margin: 0;
    font-size: 1.2rem; /* Slightly larger font size for name */
    text-align: center;
  }
  
  .user-info p {
    text-align: center;
    font-size: 0.9rem;
    color: #777;
  }
  
  .sidebar-links ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem; /* Add some spacing above the links */
  }
  
  .sidebar-links li {
    margin: 0.5rem 0;
  }
  
  .sidebar-links a {
    color: #333;
    text-decoration: none;
    font-size: 1rem;
  }
  
  .sidebar-footer {
    padding-top: 1rem;
  }
  
  .sidebar-footer button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 1rem 2rem; /* Increased padding for visibility */
    font-size: 1.1rem; /* Larger button text */
    cursor: pointer;
    border-radius: 5px; /* Rounded corners for the button */
    width: 100%; /* Make button fill the width of the sidebar */
    transition: background-color 0.3s ease;
  }
  
  .sidebar-footer button:hover {
    background-color: #c0392b; /* Darker color on hover */
  }
  </style>
  