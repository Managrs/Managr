<script lang="ts">
import { ref, watchEffect } from 'vue';
import { useUserStore } from '../stores/userStore'; // Import your Pinia store
import { useAuth0 } from '@auth0/auth0-vue'; // Import Auth0 hook

export default {
  name: 'UserProfile',
  setup() {
    // Auth0 hooks
    const { logout, user, isAuthenticated } = useAuth0();

    // Pinia store
    const userStore = useUserStore();
    
    // Watch for changes in authentication
    watchEffect(() => {
      if (isAuthenticated.value && user.value) {
        userStore.setUser({
          name: user.value.name || '',
          email: user.value.email || '',
          avatar: user.value.picture || '', // Ensure a default picture exists
        });
      }
    });

    // Logout function
    const handleLogout = () => {
      userStore.clearUser(); // Clear user data on logout
      logout({
        logoutParams: { returnTo: window.location.origin }, // Redirect on logout
      });
    };

    return {
      userStore, // Expose the Pinia store to the template
      handleLogout,
    };
  },
};
</script>
