<template>
  <section class="category-view">
    <h2 class="view-title">Browse Gigs</h2>
    <section class="cards-container">
      <CategoryCard
        v-for="item in visibleCategories"
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
  components: {
    CategoryCard,
  },
  data() {
    return {
      showAll: false,
      initialLimit: 10,
      categories: [] as CategoryItem[],
    };
  },
  computed: {
    visibleCategories(): CategoryItem[] {
      return this.showAll
        ? this.categories
        : this.categories.slice(0, this.initialLimit);
    }
  },
  mounted() {
    fetch("https://managrs-server1.azurewebsites.net/getGig")
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch gigs');
        return response.json();
      })
      .then(data => {
        this.categories = data.map((gig: any, index: number) => ({
          id: index + 1,
          name: gig.clientName,
          mail: gig.clientEmail || 'no-email@example.com',
          image: gig.image,
          title: gig.gigName,
          description: gig.gigDescription,
          category: gig.category,
          budget: gig.budget,
          time: gig.gigDue,
        }));
      })
      .catch(error => {
        console.error('Error loading gigs:', error);
      });
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
  position: sticky;
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
