<template>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/@vue/compiler-sfc@3/dist/compiler-sfc.js"></script>
  <section class="category-view">
    <h2 class="view-title">Browse Gigs</h2>
    <section class="cards-container">
      <CategoryCard
        v-for="item in visibleCategories"
        :key="item.id"
        :image="item.image"
        :title="item.title"
        :description="item.description"
        :category="item.category"
      />
    </section>
    <button 
      class="toggle-button" 
      @click="toggleShowAll"
    >
      {{ showAll ? 'Show Less' : `Show All (${categories.length})` }}
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryCard from './CategoryCard.vue';

interface CategoryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

export default defineComponent({
  name: 'CategoryView',
  components: {
    CategoryCard,
  },
  data() {
    return {
      showAll: false,
      initialLimit: 8,
      categories: [
        {
          id: 1,
          image: '/favicom.ico',
          title: 'Favicom Inc',
          description: 'Discover our new summer arrivals',
          category: 'Fashion',
        },
        {
          id: 2,
          image: '/favicom.ico',
          title: 'Summer Collection',
          description: 'Discover our new summer arrivals',
          category: 'Fashion',
        },
        {
          id: 3,
          image: '/favicom.ico',
          title: 'Summer Collection',
          description: 'Discover our new summer arrivals',
          category: 'Fashion',
        },
        {
          id: 4,
          image: '/favicom.ico',
          title: 'Summer Collection',
          description: 'Discover our new summer arrivals',
          category: 'Fashion',
        },
        {
          id: 5,
          image: '/favicom.ico',
          title: 'Summer Collection',
          description: 'Discover our new summer arrivals',
          category: 'Fashion',
        },
        {
          id: 6,
          image: '/favicom.ico',
          title: 'Summer Collection',
          description: 'Discover our new summer arrivals',
          category: 'Fashion',
        },
        {
          id: 7,
          image: '/favicom.ico',
          title: 'Summer Collection',
          description: 'Discover our new summer arrivals',
          category: 'Fashion',
        },
        {
          id: 8,
          image: '/favicom.ico',
          title: 'Latest Gadgets',
          description: 'Cutting-edge technology for your home',
          category: 'Electronics',
        },
        {
          id: 9,
          image: '/favicom.ico',
          title: 'Home Essentials',
          description: 'Everything to make your home cozy',
          category: 'Home Decor',
        },
        {
          id: 10,
          image: '/favicom.ico',
          title: 'Sports Gear',
          description: 'Equipment for your active lifestyle',
          category: 'Sports',
        },
        {
          id: 11,
          image: '/favicom.ico',
          title: 'Sports Gear',
          description: 'Equipment for your active lifestyle',
          category: 'Sports',
        },
        {
          id: 12,
          image: '/favicom.ico',
          title: 'Sports Gear',
          description: 'Equipment for your active lifestyle',
          category: 'Sports',
        },
      ] as CategoryItem[],
    };
  },
  computed: {
    visibleCategories(): CategoryItem[] {
      if (!Array.isArray(this.categories)) return [];
      return this.showAll 
        ? this.categories 
        : this.categories.slice(0, this.initialLimit);
    }
  },
  methods: {
    toggleShowAll(): void {
      this.showAll = !this.showAll;
    }
  }
});
</script>

<style scoped>
.category-view {
  padding: 2rem 1rem;
}

.view-title {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
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
