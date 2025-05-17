<template>
  <section class="profile-page">
    <SearchComponent @search="handleSearch" />
    
    <!-- Profiles section -->
    <section class="profiles-view">
      <h2 class="section-title">Featured Professionals</h2>
      <section class="profiles-container">
        <ProfileCard
          v-for="profile in filteredProfiles"
          :key="profile.id"
          :image="profile.image"
          :name="profile.name"
          :job="profile.job"
        />
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileCard from './ProfileCard.vue';
import SearchComponent from './SearchComponent.vue';

interface Profile {
  id: number;
  image: string;
  name: string;
  job: string;
}

export default defineComponent({
  name: 'ProfileView',
  components: {
    ProfileCard,
    SearchComponent,
  },
  data() {
    return {
      profiles: [] as Profile[],
      searchQuery: '',
      loading: true,
    };
  },
  computed: {
    filteredProfiles(): Profile[] {
      if (!this.searchQuery.trim()) return this.profiles;
      return this.profiles.filter((p) =>
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.job.toLowerCase().includes(this.searchQuery)
      );
    },
  },
  methods: {
    handleSearch(query: string) {
      this.searchQuery = query;
    },
    async fetchProfiles() {
      try {
        const backendUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${backendUrl}/allusers`);
        const data = await response.json();
        this.profiles = data.map((user: any) => ({
          id: user.id,
          image: user.avatar,
          name: user.fullName,
          job: user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase(),
        }));
      } catch (err) {
        console.error('Error loading profiles:', err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchProfiles();
  },
});
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profiles-view {
  padding: 2rem 1rem;
  width: 100%;
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
