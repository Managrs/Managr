<template>
  <section class="chat-thread">
    <header class="thread-header">
      <img :src="avatar" class="avatar" />
      <h3>{{ userName }}</h3>
    </header>
    <section class="messages">
      <section v-for="(msg, index) in messages" :key="index" :class="['message-bubble', msg.sender === 'me' ? 'sent' : 'received']">
        {{ msg.content }}
      </section>
    </section>
    <footer class="message-input">
      <input v-model="newMessage" placeholder="Type your message..." @keyup.enter="send" />
      <button @click="send" class="send-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          viewBox="0 0 16 16">
          <path
            d="M15.854.146a.5.5 0 0 1 .11.548l-6 14a.5.5 0 0 1-.948-.21l-.72-4.32L3.27 7.27l-4.32-.72a.5.5 0 0 1-.21-.948l14-6a.5.5 0 0 1 .548.11z" />
        </svg>
      </button>
    </footer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/userStore';

export default defineComponent({
  name: 'ChatThread',
  props: {
    userName: String,
    avatar: String,
    receiverMail: String,
  },
  data() {
    return {
      newMessage: '',
      messages: [] as { sender: string; content: string }[],
      message: {
        senderId: '',
        receiverId: '',
        content: ''
      }
    };
  },
  async mounted() {
    const userStore = useUserStore();
    this.message.senderId = userStore.email;
    this.message.receiverId = this.receiverMail || '';

    await this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        const userStore = useUserStore();
        const backendUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${backendUrl}/messages?user1=${userStore.email}&user2=${this.receiverMail}`
        );

        const data = await response.json();
        console.log(data);

        if (!Array.isArray(data)) {
          console.error('Expected an array, got:', data);
          return;
        }

        this.messages = data.map((msg: any) => ({
          sender: msg.senderId === userStore.email ? 'me' : msg.senderName,
          content: msg.content
        }));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },

    async send() {
      if (this.newMessage.trim()) {
        const msgToSend = this.newMessage.trim();

        this.messages.push({ sender: 'me', content: msgToSend });

        this.message.content = msgToSend;
        this.newMessage = '';

        try {
          const backendUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${backendUrl}/newMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.message)
          });

          if (!response.ok) throw new Error('Failed to send message');

          const data = await response.json();
          console.log('Message sent:', data);
        } catch (error) {
          console.error('Send error:', error);
        }
      }
    }
  }
});
</script>


<style scoped>
.chat-thread {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.thread-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.thread-header .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.message-bubble {
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;
}

.sent {
  align-self: flex-end;
  background-color: #dcf8c6;
  color: #000;
  border-bottom-right-radius: 0;
}

.received {
  align-self: flex-start;
  background-color: #fff;
  color: #000;
  border-bottom-left-radius: 0;
  border: 1px solid #ddd;
}

.message-input {
  display: flex;
  padding: 0.75rem;
  border-top: 1px solid #ddd;
}

.message-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.message-input button {
  margin-left: 0.5rem;
}

.send-btn {
  background-color: #000000;
  color: white;
  border: none;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
