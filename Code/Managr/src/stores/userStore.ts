import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const name = ref('');
  const email = ref('');
  const avatar = ref('');

  const setUser = (userData: { name: string; email: string; avatar: string }) => {
    name.value = userData.name;
    email.value = userData.email;
    avatar.value = userData.avatar;
  };

  return { name, email, avatar, setUser };
});