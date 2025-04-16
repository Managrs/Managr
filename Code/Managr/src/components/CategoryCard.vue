<template>
  <article class="card">
    <section 
      class="image-container" 
      :style="{ backgroundImage: `url(${image})` }"
    >
      <h3 class="card-title">{{ title }}</h3>
    </section>
    <section class="card-content">
      <h4 class="card-category">{{ category }}</h4>
      <p class="card-description">{{ description }}</p>
    </section>
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
  background: #2b3d4f;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.image-container {
  height: 150px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}

.card-title {
  color: #2b3d4f;
  margin: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.card-content {
  padding: 1.5rem;
  background: white;
}

.card-category {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
}

.card-description {
  color: #333;
  margin: 0;
  line-height: 1.5;
}
</style>