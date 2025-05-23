<!-- Popup.vue -->
<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-content">
      <slot />
      <button @click="closePopup"> OK </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  emits: ["close"],
  methods: {
    closePopup() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.popup-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
}
</style>
