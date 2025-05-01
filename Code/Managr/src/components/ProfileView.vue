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

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileCard from './ProfileCard.vue';

interface Profile {
  id: number;
  image: string;
  name: string;
  job: string;
}

export default defineComponent({
  name: 'ProfileView',
  components: { ProfileCard },
  data() {
    return {
      profiles: [] as Profile[],
      loading: true,
      error: 'Error occured', 
    };
  },
  mounted() {
    this.fetchProfiles();
  },
  methods: {
    async fetchProfiles() {
      try {
        const backendUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${backendUrl}/allusers`);
        if (!response.ok) {
          throw new Error('Failed to fetch freelancers');
        }
        const data = await response.json();
        this.profiles = data.map((user: any) => ({
          id: user.id,
          image: user.avatar,
          name: user.fullName,
          job: user.role.charAt(0) + user.role.slice(1).toLowerCase(),
        }));
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        this.loading = false;
      }
    }
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