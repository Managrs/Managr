<template>
  <section class="profiles-view">
    <h2 class="section-title">Explore other Freelancers</h2>
    <section class="profiles-container">
      <ProfileCard
        v-for="profile in profiles"
        :key="profile.id"
        :image="profile.image"
        :name="profile.name"
        :job="profile.job"
        :bio="profile.bio"
      />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileCard from './ProfileCard.vue';

interface Profile {
  id: number;
  image: string;
  name: string;
  job: string;
  bio: string;
}

export default defineComponent({
  name: 'ProfileView',
  components: { ProfileCard },
  data() {
    return {
      profiles: [
        {
          id: 1,
          image: '/images/fashion.jpg',
          name: 'Alex Johnson',
          job: 'UX Designer',
          bio: 'Specializing in user-centered design with 8 years of experience.'
        },
        {
          id: 2,
          image: '/images/fashion.jpg',
          name: 'Sarah Williams',
          job: 'Frontend Developer',
          bio: 'React specialist passionate about creating beautiful interfaces.'
        },
        {
          id: 3,
          image: '/images/fashion.jpg',
          name: 'Sarah Williams',
          job: 'Frontend Developer',
          bio: 'React specialist passionate about creating beautiful interfaces.'
        },
        {
          id: 4,
          image: '/images/fashion.jpg',
          name: 'Sarah Williams',
          job: 'Frontend Developer',
          bio: 'React specialist passionate about creating beautiful interfaces.'
        },
        {
          id: 5,
          image: '/images/fashion.jpg',
          name: 'Sarah Williams',
          job: 'Frontend Developer',
          bio: 'React specialist passionate about creating beautiful interfaces.'
        },
        {
          id: 6,
          image: '/images/fashion.jpg',
          name: 'Sarah Williams',
          job: 'Frontend Developer',
          bio: 'React specialist passionate about creating beautiful interfaces.'
        },
        {
          id: 7,
          image: '/images/fashion.jpg',
          name: 'Sarah Williams',
          job: 'Frontend Developer',
          bio: 'React specialist passionate about creating beautiful interfaces.'
        },
        // Add more profiles...
      ] as Profile[]
    };
  }
});
</script>

<style scoped>
.profiles-view {
  padding: 2rem 1rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  color: #2b3d4f;
}

.profiles-container {
  display: flex;
  overflow-x: auto;
  padding: 1rem;
  gap: 20px;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #007BFF #f1f1f1; /* For Firefox */
}

/* For Chrome/Safari */
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