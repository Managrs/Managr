import { defineStore } from 'pinia';
import { ref } from 'vue';

<<<<<<< HEAD

interface User {
  name?: string;
  email?: string;
  avatar?: string;
=======
interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
>>>>>>> ae025d5794dcfbb8be0425c90d158cccb8a6debb
}

export const useUserStore = defineStore('user', () => {
  const name = ref('Guest User');
  const email = ref('guestuser@gmail.com');
  const avatar = ref('/profile.jpg');
  const role = ref('user');  // Add role

  const setUser = (userData: User) => {
<<<<<<< HEAD
    name.value = userData.name || "John Doe";
    email.value = userData.email || "johndoe@gmail.com";
    avatar.value = userData.avatar || 'https://github.com/Managrs/Managr/blob/main/Code/Managr/public/blank.png';
=======
    name.value = userData.name;
    email.value = userData.email;
    avatar.value = userData.avatar;
    role.value = userData.role;
>>>>>>> ae025d5794dcfbb8be0425c90d158cccb8a6debb
  };

  const clearUser = () => {
    name.value = 'Guest User';
    email.value = 'guestuser@gmail.com';
    avatar.value = '/profile.jpg';
    role.value = 'user';
  };

   return { name, email, avatar, role, setUser, clearUser };
});
