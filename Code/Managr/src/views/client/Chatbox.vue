<template>
    <main class="chat-app">
      <aside class="sidebar">
        <header class="sidebar-header">
          <h2>Messages</h2>
          <input v-model="search" type="text" placeholder="Search" class="search" />
        </header>
  
        <section v-if="categories.length > 0" class="message-list">
          <ChatCard
            v-for="item in filteredCategories"
            :key="item.id"
            :user="item"
            @select="selectUser"
          />
        </section>
  
        <section v-else class="empty-state">
          <p>No users available</p>
        </section>
      </aside>
  
      <section class="chat-area">
        <ChatThread
          v-if="selectedUser"
          :userName="selectedUser.name"
          :avatar="selectedUser.avatar"
          :messages="chatHistory[selectedUser.id] || []"
          @send-message="handleSendMessage"
        />
        <p v-else class="empty-state">Select a chat to start messaging</p>
      </section>
    </main>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ChatCard from '../chatCard.vue';
  import ChatThread from '../messageCard.vue';

  
  
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
        categories: [] as ChatItem[],
        selectedUser: null as ChatItem | null,
        chatHistory: {} as Record<number, any[]>
      };
    },
    computed: {
      filteredCategories(): ChatItem[] {
        return this.categories.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    mounted() {
      this.fetchChats();
    },
    methods: {
  async fetchChats() {
    const backendUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${backendUrl}/allusers`);
    const data = await response.json();

    this.categories = data.map((user: any) => ({
      id: user.id,
      name: user.fullName,
      avatar: user.avatar,
      email: user.email // include email for querying messages
    }));
  },

  async fetchMessages(user: ChatItem) {
    const backendUrl = import.meta.env.VITE_API_URL;
    const queryParam = encodeURIComponent(user.email);
    const response = await fetch(`${backendUrl}/messages?userId=${queryParam}`);
    const messages = await response.json();

    const chatMap: Record<number, any[]> = {};

    messages.forEach((msg: any) => {
      const otherUserId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
      if (!chatMap[otherUserId]) {
        chatMap[otherUserId] = [];
      }
      chatMap[otherUserId].push({
        sender: msg.senderId === user.id ? 'me' : msg.senderName,
        content: '[message content missing in your current schema]'
      });
    });

    this.chatHistory = chatMap;
  },

  async selectUser(user: ChatItem) {
    this.selectedUser = user;
    await this.fetchMessages(user);
  },

  handleSendMessage(msg: string) {
    if (!this.selectedUser) return;
    if (!this.chatHistory[this.selectedUser.id]) {
      this.chatHistory[this.selectedUser.id] = [];
    }
    this.chatHistory[this.selectedUser.id].push({
      sender: 'me',
      content: msg
    });
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
  
  /* Optional styling if your ChatCard or avatars have images */
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
  </style>
  