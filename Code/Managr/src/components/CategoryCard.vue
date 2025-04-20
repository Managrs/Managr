<template>
  <article class="card">
    <div class="image-container" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <h4 class="card-category">{{ category }}</h4>
      <p class="card-description">{{ description }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

// Component name declaration (optional)
defineOptions({
  name: 'CategoryCard'
});
</script>

<style scoped>
.card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 280px;
  background: white;
  margin: 1rem;
  z-index: 1;
}

.card:hover {
  transform: translateY(-5px);
  z-index: 2;
}

.image-container {
  height: 140px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
}

.card-content {
  padding: 1rem;
}

.card-title {
  color: black;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px;
  margin: 0;
}

.card-category {
  color: #111;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.card-description {
  color: #444;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}
</style>