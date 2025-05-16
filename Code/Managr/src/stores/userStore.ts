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
  const role = ref('user');  // Add role

  const setUser = (userData: User) => {
    name.value = userData.name;
    email.value = userData.email;
    avatar.value = userData.avatar;
    role.value = userData.role;
  };

  const clearUser = () => {
    name.value = ' ';
    email.value = ' ';
    avatar.value = '/profile.jpg';
    role.value = 'user';
  };

   return { name, email, avatar, role, setUser, clearUser };
});
