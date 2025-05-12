import { defineStore } from 'pinia';
import { ref } from 'vue';


interface User {
  name?: string;
  email?: string;
  avatar?: string;
}

export const useUserStore = defineStore('user', () => {
  const name = ref('');
  const email = ref('');
  const avatar = ref('');

  const setUser = (userData: User) => {
    name.value = userData.name || "John Doe";
    email.value = userData.email || "johndoe@gmail.com";
    avatar.value = userData.avatar || 'https://github.com/Managrs/Managr/blob/main/Code/Managr/public/blank.png';
  };

  const clearUser = () => {
    name.value = '';
    email.value = '';
    avatar.value = '';
  };

  return { name, email, avatar, setUser, clearUser };
});
