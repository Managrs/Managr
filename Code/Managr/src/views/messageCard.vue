<template>
    <section class="chat-thread">
      <header class="thread-header">
        <img :src="avatar" class="avatar" />
        <h3>{{ userName }}</h3>
      </header>
      <div class="messages">
        <div v-for="(msg, index) in messages" :key="index" class="message">{{ msg }}</div>
      </div>
      <footer class="message-input">
        <input v-model="newMessage" placeholder="Type your message..." @keyup.enter="send" />
        <button @click="send">Send</button>
      </footer>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  
  export default defineComponent({
    name: 'ChatThread',
    props: {
      userName: String,
      avatar: String,
      messages: {
        type: Array as PropType<string[]>,
        required: true
      }
    },
    data() {
      return {
        newMessage: ''
      };
    },
    methods: {
      send() {
        if (this.newMessage.trim()) {
          this.$emit('send-message', this.newMessage.trim());
          this.newMessage = '';
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
  }
  
  .message {
    background: #e1f5fe;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    max-width: 70%;
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
  </style>
  