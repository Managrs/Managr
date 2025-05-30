<template>
  <section class="category-view">
    <section class="header-container">
      <h2 class="view-title">Browse Gigs</h2>
      <section class="search-filter-wrapper">
        <section class="search-container">
          <input
            v-model="searchQuery"
            @input="applyFilters"
            type="text"
            placeholder="Search by title or category"
            class="search-input"
          />
        </section>
      </section>
    </section>
    
    <section class="cards-container">
      <CategoryCard
        v-for="item in filteredCategories"
        :key="item.id"
        :name="item.name"
        :mail="item.mail"
        :avatar="item.image"
        :title="item.title"
        :description="item.description"
        :category="item.category"
        :budget="item.budget"
        :time="item.time"
      />
    </section>

    <button class="toggle-button" @click="toggleShowAll">
      {{ showAll ? 'Show Less' : `Show All (${categories.length})` }}
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryCard from './CategoryCard.vue';

interface CategoryItem {
  id: number;
  name: string;
  mail: string;
  image: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  time: number;
}

export default defineComponent({
  name: 'CategoryView',
  components: { CategoryCard },
  data() {
    return {
      showAll: false,
      initialLimit: 10,
      categories: [] as CategoryItem[],
      searchQuery: '',
      maxPrice: null as number | null,
    };
  },
  computed: {
    visibleCategories(): CategoryItem[] {
      return this.showAll
        ? this.categories
        : this.categories.slice(0, this.initialLimit);
    },
    filteredCategories(): CategoryItem[] {
      return this.visibleCategories.filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesSearch;
      });
    }
  },
  mounted() {
    const backendUrl = import.meta.env.VITE_API_URL;
    fetch(`${backendUrl}/allgigs`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch gigs');
        return response.json();
      })
      .then((data) => {
        this.categories = data.map((gig: any) => ({
          id: gig.id,
          name: gig.name,
          mail: gig.mail,
          image: gig.image,
          title: gig.title,
          description: gig.description,
          category: gig.category,
          budget: gig.budget,
          time: gig.time,
        }));
      })
      .catch((error) => {
        console.error('Error loading gigs:', error);
      });
  },
  methods: {
    toggleShowAll(): void {
      this.showAll = !this.showAll;
    },
    applyFilters(): void {
    }
  }
});
</script>

<style scoped>
.category-view {
  padding: 2rem 1rem;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.view-title {
  font-size: 2rem;
  color: #333;
}

.search-container {
  display: flex;

  align-items: center;
  max-width: 400px;
  width: 100%;
  margin-left: 0rem;
}

.search-input {
  flex-grow: 1;
  font-size: 16px;
  padding: 10px 58px;
  border: 1px solid #000;
  border-radius: 6px;
  background: transparent;
  color: #333;
}

.search-input::placeholder {
  color: #828282;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.toggle-button {
  display: block;
  margin: 2rem auto 0;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.toggle-button:hover {
  background: #0056b3;
}
</style>
