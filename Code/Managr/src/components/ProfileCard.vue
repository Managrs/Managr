<template>
  <article class="profile-card">
    <div class="profile-image-container">
      <img :src="image" :alt="name" class="profile-image">
    </div>
    <div class="profile-content">
      <h3 class="profile-name">{{ name }}</h3>
      <p class="profile-job">{{ job }}</p>
      <p class="profile-bio">{{ bio }}</p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ProfileCard',
  props: {
    image: {
      type: String as PropType<string>,
      required: true
    },
    name: {
      type: String as PropType<string>,
      required: true
    },
    job: {
      type: String as PropType<string>,
      required: true
    },
    bio: {
      type: String as PropType<string>,
      required: true
    }
  }
});
</script>

<style scoped>
.profile-card {
  flex: 0 0 200px; /* Fixed width, won't grow or shrink */
  height: 200px;
  background: #2b3d4f;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
}

.profile-image-container {
  height: 100px;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-content {
  padding: 1.5rem;
}

.profile-name {
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.profile-job {
  color: #007BFF;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.profile-bio {
  color: #666;
  line-height: 1.5;
  margin: 0;
}
</style>