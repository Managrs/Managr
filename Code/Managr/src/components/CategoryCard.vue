<template>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/@vue/compiler-sfc@3/dist/compiler-sfc.js"></script>
  <article class="card">
    <div class="image-container" :style="{ backgroundImage: `url(${image})` }">
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <h4 class="card-category">{{ category }}</h4>
      <p class="card-description">{{ description }}</p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategoryCard',
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
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

.card-title {
  color: black;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px;
}

.card-content {
  padding: 1rem;

}

.card-category {
  color: #111;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-description {
  color: #444;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>
