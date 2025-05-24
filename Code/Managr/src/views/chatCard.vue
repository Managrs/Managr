<template>
    <article class="message-card" @click="$emit('select', user)">
      <img :src="user.avatar" class="avatar" />
      <section class="details">
        <h4>{{ user.name }}</h4>
      </section>
    </article>
  </template>
  
  <script lang="ts">
  import { defineComponent,type PropType } from 'vue';
  
  export default defineComponent({
    name: 'ChatCard',
    props: {
      user: {
        type: Object as PropType<{ id: number; email:string; name: string; avatar: string }>,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  .message-card {
    display: flex;
    align-items: center;
    padding: 0.01rem;
    margin: 0.5rem;
    border: 1px solid #030809;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .message-card:hover {
    background-color: #cae6ef;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .details h4 {
    margin: 0;
    font-weight: bold;
  }
  </style>
  