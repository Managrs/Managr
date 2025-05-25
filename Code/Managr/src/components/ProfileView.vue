<template>
  <section class="profile-page">
    <section class="sticky-header">
      <SearchComponent @search="handleSearch" />
      <h2 class="section-title">Featured Professionals</h2>
    </section>

    <section class="scrollable-profiles">
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
      showAll: false,
      initialLimit: 10,
    };
  },
  computed: {
    visibleProfiles(): Profile[] {
      return this.showAll
        ? this.profiles
        : this.profiles.slice(0, this.initialLimit);
    },
    filteredProfiles(): Profile[] {
      return this.visibleProfiles.filter((p) => {
        const query = this.searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.job.toLowerCase().includes(query)
        );
      });
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
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.sticky-header {
  background-color: white;
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.section-title {
  font-size: 1.8rem;
  margin-top: 0.5rem;
}

.scrollable-profiles {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 1rem;
  width: 100%;
}

.profiles-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
}

.toggle-button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-button:hover {
  background-color: #0056b3;
}
</style>
