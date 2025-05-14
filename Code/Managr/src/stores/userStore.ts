import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define the user type for better type safety
interface User {
  name: string;
  email: string;
  avatar : string;
}

export const useUserStore = defineStore('user', () => {
  const name = ref('');
  const email = ref('');
  const avatar = ref('');

  // Set user data
  const setUser = (userData: User) => {
    name.value = userData.name;
    email.value = userData.email;
    avatar.value = userData.avatar;
  };

  // Optionally, clear user data (e.g., for logout)
  const clearUser = () => {
    name.value = '';
    email.value = '';
    avatar.value = '';
  };

  return { name, email, avatar, setUser, clearUser };
});
