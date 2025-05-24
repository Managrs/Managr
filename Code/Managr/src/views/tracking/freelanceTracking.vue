<template>
  <div class="freelance-track">
    <h1>My Projects</h1>

    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :id="project.id"
      :title="project.title"
      :client="project.client"
      :description="project.description"
      :totalPrice="project.totalPrice"
      :paidAmount="project.paidAmount"
      :paymentsConfirmed="project.paymentsConfirmed"
      :progress="project.progress"
      @update-progress="updateProgress"
      @confirm-payment="confirmPayment"
      @save-project="saveProject"
      @export-pdf="exportToPDF"
    />
  </div>
</template>

<script>
import ProjectCard from './projectCard.vue';

export default {
  name: 'FreelanceTrack',
  components: { ProjectCard },
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'Website Redesign',
          dueDate: '2025-06-15',
          client: 'Acme Inc.',
          description: 'Redesign their marketing website.',
          totalPrice: 3000,
          paidAmount: 1500,
          paymentsConfirmed: 1000,
          progress: 45
        },
        {
          id: 2,
          title: 'E-commerce App',
          dueDate: '2025-07-01',
          client: 'ShopMart',
          description: 'Build a shopping app for their platform.',
          totalPrice: 5000,
          paidAmount: 2000,
          paymentsConfirmed: 2000,
          progress: 60
        }
      ]
    };
  },
  methods: {
    updateProgress(projectId, newProgress) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        project.progress = newProgress;
      }
    },
    confirmPayment(projectId) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        const unconfirmedAmount = project.paidAmount - project.paymentsConfirmed;
        if (unconfirmedAmount > 0) {
          project.paymentsConfirmed += unconfirmedAmount;
        }
      }
    },
    saveProject(projectId) {
      console.log(`Saving project ${projectId}`);
      // Implement your save logic here (API call, localStorage, etc.)
    },
    exportToPDF(projectId) {
      console.log(`Exporting project ${projectId} to PDF`);
      // Implement PDF logic here
    }
  }
};
</script>

<style scoped>
.freelance-track {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}
</style>
