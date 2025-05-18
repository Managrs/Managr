import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export const useUserStore = defineStore('user', () => {
  const name = ref('User not found');
  const email = ref('nouser@gmail.com');
  const avatar = ref('/profile.jpg');
  const role = ref('user');

  const setUser = (userData: User) => {
    name.value = userData.name;
    email.value = userData.email;
    avatar.value = userData.avatar;
    role.value = userData.role;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const clearUser = () => {
    name.value = 'NO USER';
    email.value = 'NO EMAIL';
    avatar.value = '/profile.jpg';
    role.value = 'NON';
    localStorage.removeItem('user');
  };

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
