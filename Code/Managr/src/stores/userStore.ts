import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export const useUserStore = defineStore('user', () => {
  const name = ref('Guest User');
  const email = ref('guestuser@gmail.com');
  const avatar = ref('/profile.jpg');
  const role = ref('user');

  // Set user data
  const setUser = (userData: User) => {
    name.value = userData.name;
    email.value = userData.email;
    avatar.value = userData.avatar;
    role.value = userData.role;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Clear user data (e.g., for logout)
  const clearUser = () => {
    name.value = 'NO USER';
    email.value = 'NO EMAIL';
    avatar.value = '/profile.jpg';
    role.value = 'NON';
    localStorage.removeItem('user');
  };

  // 👉 Initialize from localStorage (only once when store is created)
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    }
  }

  return { name, email, avatar, role, setUser, clearUser };
});
