<template>
  <main class="chat-app">
  <aside class="sidebar">
    <header class="sidebar-header">
      <button type="button" class="user-btn" @click="goBack">Back</button>
      <h2>Messages</h2>
      <input v-model="search" type="text" placeholder="Search" class="search" />
    </header>

    <section v-if="filteredContacts.length > 0" class="message-list">
      <ChatCard
        v-for="item in filteredContacts"
        :key="item.id"
        :user="item"
        @select="selectUser"
      />
    </section>

    <section v-if="filteredCategories.length > 0" class="toggle-categories">
      <button type="button" class="user-btn" @click="toggleCategories">
        {{ showCategories ? 'Hide Users' : 'All Users' }}
      </button>
    </section>

    <section
      v-if="showCategories && filteredCategories.length > 0"
      class="message-list"
    >
      <ChatCard
        v-for="item in filteredCategories"
        :key="item.id"
        :user="item"
        @select="selectUser"
      />
    </section>

    <section
      v-if="filteredContacts.length === 0 && filteredCategories.length === 0"
      class="empty-state"
    >
      <p v-if="search">No users match your search.</p>
      <p v-else>No users available.</p>
    </section>
  </aside>


    <section class="chat-area">
      <ChatThread v-if="selectedUser" :userName="selectedUser.name" :avatar="selectedUser.avatar" :receiverMail="selectedUser.email"
       />
      <p v-else class="empty-state">Select a chat to start messaging</p>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChatCard from '../chatCard.vue';
import ChatThread from '../messageCard.vue';
import { useUserStore } from '../../stores/userStore';

interface ChatItem {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

export default defineComponent({
  name: 'Chatbox',
  components: {
    ChatCard,
    ChatThread
  },
  data() {
    return {
      search: '',
      showCategories: false,
      contacts: [] as ChatItem[],
      categories: [] as ChatItem[],
      selectedUser: null as ChatItem | null
    };
  },
  computed: {
    filteredCategories(): ChatItem[] {
      return this.categories.filter((item) =>
        (item.name?.toLowerCase() ?? '').includes(this.search.toLowerCase())
      );
    },
    filteredContacts(): ChatItem[] {
      return this.contacts.filter((item) =>
        (item.name?.toLowerCase() ?? '').includes(this.search.toLowerCase())
      );
    }

  },
  mounted() {
    this.fetchContacts();
    this.fetchChats();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    toggleCategories() {
      this.showCategories = !this.showCategories;
    },

    async fetchContacts(){
      const userStore = useUserStore();
      const backendUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${backendUrl}/contacts?email=${userStore.email}`);
      const data = await response.json();

      this.contacts = data.map((user: any) => ({
        id: user.id,
        name: user.fullName,
        avatar: user.avatar,
        email: user.email
      }));
    },

    async fetchChats(){
      const backendUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${backendUrl}/allusers`);
      const data = await response.json();

      this.categories = data.map((user: any) => ({
        id: user.id,
        name: user.fullName,
        avatar: user.avatar,
        email: user.email
      }));
    },

    async selectUser(user: ChatItem) {
      this.selectedUser = user;
    }
  }
});
</script>

<style scoped>
.chat-app {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 330px;
  min-width: 330px;
  max-width: 330px;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
}

.sidebar-header h2 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.search {
  width: 95%;
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  overflow-y: auto;
  padding: 1rem;
}

.toggle-categories {
  padding: 0.5rem 1rem;
  border-top: 1px solid #eee;
  background-color: #f5f5f5;
  text-align: center;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 1rem;
  padding: 2rem;
  text-align: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.details h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.details p {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  color: #666;
}

.message-card:hover {
  background-color: #e8f4f8;
}

/* Optional: mobile responsive layout */
@media (max-width: 768px) {
  .chat-app {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    max-width: none;
    border-right: none;
    border-bottom: 1px solid #eee;
  }

  .chat-area {
    padding: 0.5rem;
  }
}

.secondary-btn {
  color: #ffffff;
  background: #000000;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 1rem;
}

.secondary-btn:hover {
  background: #e77e23;
  color: #ffffff;
}

.user-btn {
  color: #181f1b;
  background: #5baf7e;
  padding: 0.55rem 1.0rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 1rem;
}

.user-btn:hover {
  background:  #07e061;
  color: #181f1b;
}

</style>