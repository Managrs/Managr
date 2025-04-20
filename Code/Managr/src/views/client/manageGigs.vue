<template>
  <nav>
      <router-link to="/DashboardClient">
          <button type="button" class="secondary-btn">Back to Recent Gigs</button>
      </router-link>
      <router-link to="/postgig">
          <button type="button" class="secondary-btn">Post Gig</button>
      </router-link>
  </nav>
  <section class="manage-requests">
    <h2>Manage Requests</h2>

    <div class="request-box">
      <header class="request-header">
        <div class="date">Dec 06, 18</div>
      </header>

      <div class="request-body">
        <p>
          I'm looking for a content marketing specialist to create my business content marketing strategy.
        </p>
        <div class="meta">
          <span>Delivery Time - 7 days</span>
          <span>Budget - $150</span>
        </div>
      </div>

      <footer class="request-footer">
        <button class="green-btn">Delete Gig</button>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref("pending")

const setTab = (tab: string) => {
activeTab.value = tab
}
</script>

<style scoped>
.manage-requests {
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
}

.tabs button {
  background: none;
  border: none;
  padding: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  position: relative;
}

.tabs .active {
  border-bottom: 2px solid #000;
}

.badge {
  background: #10b981;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.request-box {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  background-color: white;
  margin-bottom: 2rem;
}

.request-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.dropdown-button {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
}

.request-body p {
  margin-bottom: 0.5rem;
}

.meta {
  font-size: 0.9rem;
  color: #555;
  display: flex;
  gap: 1rem;
}

.request-footer {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.green-btn {
  color: #ffffff;
  background: #000000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.green-btn:hover{
  background: #e77e23;
  color: #ffffff;
}

.secondary-btn {
  color: #ffffff;
  background: #000000;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 1rem;
}

.secondary-btn:hover {
  background: #e77e23;
  color: #ffffff;
}
</style>