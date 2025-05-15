import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  name: string;
  email: string;
  avatar : string;
}

export const useUserStore = defineStore('user', () => {
  const name = ref('Guest User');
  const email = ref('guestuser@gmail.com');
  const avatar = ref('/profile.jpg');

  // Set user data
  const setUser = (userData: User) => {
    name.value = userData.name;
    email.value = userData.email;
    avatar.value = userData.avatar;
  };

  // Optionally, clear user data (e.g., for logout)
  const clearUser = () => {
    name.value = 'Guest User';
    email.value = 'guestuser@gmail.com';
    avatar.value = '/profile.jpg';
  };

  return { name, email, avatar, setUser, clearUser };
});
