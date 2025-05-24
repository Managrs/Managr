<template>
  <article class="project-card" v-if="loaded">
    <header class="project-header">
      <h2>{{ title }}</h2>
    </header>

    <section class="project-details">
      <dl class="project-info">
        <dt>Client:</dt>
        <dd>{{ clientName }}</dd>

        <dt>Description:</dt>
        <dd>{{ description }}</dd>

        <dt>Total Price:</dt>
        <dd class="price">${{ totalPrice.toFixed(2) }}</dd>

        <dt>Remaining:</dt>
        <dd class="paid-amount">${{ Amountdue.toFixed(2) }}</dd>

        <dt>Paid Amount:</dt>
        <dd class="remaining-amount">${{(totalPrice - Amountdue).toFixed(2)}}</dd>
      </dl>
    </section>

    <section class="progress-section">
      <label>Progress:</label>
      <input
        type="range"
        min="0"
        max="100"
        :value="progress"
        @input="updateProgress($event.target.value)"
        class="progress-slider"
      />
      <output class="progress-display">{{ progress }}%</output>

      <progress
        :value="progress"
        max="100"
        class="progress-bar"
      >
        {{ progress }}%
      </progress>
    </section>

    <footer class="project-actions">
      <button @click="saveProject" class="save-btn">Save Changes</button>
      <button @click="exportToPDF" class="export-btn">Export to PDF</button>
    </footer>
  </article>
</template>

<script>
import { useUserStore } from '../../stores/userStore';

export default {
  name: 'SingleProjectCard',

  data() {
    return {
      id: "",
      title: this.$route.query.jobTitle,
      clientName: this.$route.query.clientName,
      description: this.$route.query.jobDesc,
      totalPrice: 0,
      Amountdue: 0,
      progress: 0,
      loaded: false
    };

  },

  methods: {
    async fetchProject() {
      const userStore = useUserStore();
      try {
        const backendUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${backendUrl}/getprogress?email=${userStore.email}&Title=${this.title}&Description=${this.description}`);
        if (!response.ok) throw new Error('Failed to fetch progress');
        const data = await response.json();

        if (data.length === 0) {
          console.warn('No project found');
          return;
        }

        const project = data[0];
        this.id = project._id;
        this.totalPrice = project.jobBudget ;
        this.Amountdue = project.Amountdue;
        this.progress = project.progress ;
        this.loaded = true;
      } catch (err) {
        console.error('Error fetching project:', err);
      }
    },

    updateProgress(value) {
      this.progress = parseInt(value);
    },

    async saveProject() {
      try {
        const payload = {
          progressid: this.id,
          progress: this.progress
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/setprogress`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Failed to update progress');

        alert('Progress updated successfully!'); 

      } catch (err) {
        console.error('Error updating progress:', err);
        alert('Failed to update progress: ' + err.message);
      }
    },

    exportToPDF() {
      alert('Export to PDF logic goes here');
    }
  },

  mounted() {
    this.fetchProject();
  }
};
</script>


<style scoped>
/* Add your scoped styles here */
.project-card {
  border: 1px solid #ccc;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-header h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-info dt {
  font-weight: bold;
}

.project-info dd {
  margin-bottom: 0.75rem;
}

.progress-section {
  margin-top: 1.5rem;
}

.project-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.save-btn, .export-btn {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

.export-btn {
  background-color: #28a745;
}
</style>
