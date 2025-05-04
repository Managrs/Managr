<!-- src/components/SearchComponent.vue -->
<template>
  <section class="search-container">
    <h2>Find Trusted Freelancers for Your Everyday Needs</h2>
    <div class="search-wrapper">
      <input
        v-model="searchTerm"
        type="text"
        class="search-bar"
        placeholder="What can we help you with"
        @input="emitSearch"
      />
      <button class="search-icon" aria-label="Search"></button>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "SearchComponent",
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.searchTerm.toLowerCase());
    },
  },
};
</script>

<style scoped>
.search-container {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 2rem;
  width: 100%;
}

.search-container h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: bold;
  color: #222;
}

.search-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 700px;
}

.search-bar {
  padding: 0.9rem 3rem 0.9rem 1.5rem;
  width: 100%;
  border: 2px solid #000;
  font-size: 1rem;
  border-radius: 50px;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: url('../assets/searchIcon.png') no-repeat center;
  background-size: contain;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
