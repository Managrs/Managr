<template>
  <article class="profile-card">
    <section class="profile-image-container">
      <img :src="image"  class="profile-image">
    </section>
    <section class="profile-content">
      <h3 class="profile-name">{{ name }}</h3>
      <p class="profile-job">{{ job }}</p>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'ProfileCard',
  props: {
    image: {
      type: String as PropType<string>,
      required: true
    },
    name: {
      type: String as PropType<string>,
      required: true
    },
    job: {
      type: String as PropType<string>,
      required: true
    }
  }
});
</script>

<style scoped>
  .profile-card {
    flex: 0 0 200px; /* Fixed width, won't grow or shrink */
    height: 200px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    transition: transform 0.3s ease;
  }
  
  .profile-card:hover {
    transform: translateY(-5px);
  }
  
  .profile-image-container {
    height: 100px;
    overflow: hidden;
  }
  
  .profile-image {
    margin-left: 55px;
    margin-top: 10px;
    width: 90px; 
    height: 90px; 
    border-radius: 50%;;
  }
  
  .profile-content {
    padding: 1.5rem;
  }
  
  .profile-name {
    font-size: 1.3rem;
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  .profile-job {
    color: #007BFF;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }
  </style>
