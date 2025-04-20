<template>
    <section class="profiles-view">
      <h2 class="section-title">Featured Professionals</h2>
      <div class="profiles-container">
        <ProfileCard
          v-for="profile in profiles"
          :key="profile.id"
          :image="profile.image"
          :name="profile.name"
          :job="profile.job"
        />
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import ProfileCard from './ProfileCard.vue';
  
  interface Profile {
    id: number;
    image: string;
    name: string;
    job: string;
  }
  
  const profiles: Profile[] = [
    {
      id: 1,
      image: '/images/fashion.jpg',
      name: 'Alex Johnson',
      job: 'UX Designer',
    },
    {
      id: 2,
      image: '/images/fashion.jpg',
      name: 'Sarah Williams',
      job: 'Frontend Developer',
    },
    {
      id: 3,
      image: '/images/fashion.jpg',
      name: 'Sarah Williams',
      job: 'Frontend Developer',
    },
    {
      id: 4,
      image: '/images/fashion.jpg',
      name: 'Sarah Williams',
      job: 'Frontend Developer',
    },
    {
      id: 5,
      image: '/images/fashion.jpg',
      name: 'Sarah Williams',
      job: 'Frontend Developer',
    },
    {
      id: 6,
      image: '/images/fashion.jpg',
      name: 'Sarah Williams',
      job: 'Frontend Developer',
    },
    {
      id: 7,
      image: '/images/fashion.jpg',
      name: 'Sarah Williams',
      job: 'Frontend Developer',
    },
  ];
  </script>
  
  <style scoped>
  .profiles-view {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
  }
  
  .profiles-container {
    display: flex;
    overflow-x: auto;
    padding: 1rem;
    gap: 20px;
    scrollbar-width: thin;
    scrollbar-color: #007BFF #f1f1f1;
  }
  
  .profiles-container::-webkit-scrollbar {
    height: 8px;
  }
  
  .profiles-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .profiles-container::-webkit-scrollbar-thumb {
    background: #007BFF;
    border-radius: 10px;
  }
  
  .profiles-container::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
  }
  </style>