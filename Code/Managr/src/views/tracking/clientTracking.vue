<template>
  <main class="client-dashboard">
    <button type="button" class="secondary-btn" @click="goBack">🔙 Back</button>
    <header class="dashboard-header">
      <h1>Client Dashboard</h1>
      <p>Manage your projects and payments</p>
    </header>

    <section class="projects-list">
      <CurrentJobCard
        v-for="project in projects"
        :key="project.id"
        :project-id="project.id"
        :title="project.title"
        :freelancer="project.freelancer"
        :description="project.description"
        :total-price="project.totalPrice"
        :paid-amount="project.paidAmount"
        :progress="project.progress"

        :payment-amount="project.paymentAmount || 0"
        :selected-payment-method="project.selectedPaymentMethod"
        :payment-note="project.paymentNote"
        :payment-methods="paymentMethods"

        @make-payment="handleMakePayment"
        @contact-freelancer="handleContactFreelancer"
        @request-update="handleRequestUpdate"
        @export-pdf="exportToPDF"
        @update-payment-amount="(val) => updateProjectPayment(project.id, 'paymentAmount', val)"
        @update-payment-method="(val) => updateProjectPayment(project.id, 'selectedPaymentMethod', val)"
        @update-payment-note="(val) => updateProjectPayment(project.id, 'paymentNote', val)"
      />
    </section>
  </main>
</template>

<script>
import CurrentJobCard from './currentJobCard.vue';

export default {
  name: 'clientTrack',
  components: { CurrentJobCard },
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'E-commerce Website Development',
          freelancer: 'Sarah Johnson',
          description: 'Build a responsive e-commerce platform with payment integration',
          totalPrice: 2500.00,
          paidAmount: 1000.00,
          progress: 65,
          startDate: '2024-05-01',
          paymentAmount: null,
          selectedPaymentMethod: '',
          paymentNote: ''
        },
        {
          id: 2,
          title: 'Mobile App UI Design',
          freelancer: 'Michael Chen',
          description: 'Design modern UI/UX for fitness tracking mobile application',
          totalPrice: 1800.00,
          paidAmount: 600.00,
          progress: 30,
          startDate: '2024-05-10',
          paymentAmount: null,
          selectedPaymentMethod: '',
          paymentNote: ''
        },
        {
          id: 3,
          title: 'Brand Identity Package',
          freelancer: 'Emma Rodriguez',
          description: 'Complete brand identity including logo, colors, and style guide',
          totalPrice: 1200.00,
          paidAmount: 1200.00,
          progress: 100,
          startDate: '2024-04-15',
          paymentAmount: null,
          selectedPaymentMethod: '',
          paymentNote: ''
        },
        {
          id: 4,
          title: 'Content Marketing Strategy',
          freelancer: 'David Kim',
          description: 'Develop comprehensive content marketing strategy and calendar',
          totalPrice: 800.00,
          paidAmount: 0.00,
          progress: 15,
          startDate: '2024-05-20',
          paymentAmount: null,
          selectedPaymentMethod: '',
          paymentNote: ''
        }
      ],
      paymentMethods: [
        { value: 'EFT', label: 'EFT' },
        { value: 'paypal', label: 'PayPal' }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    updateProjectPayment(projectId, field, value) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) project[field] = value;
    },

    handleMakePayment({ projectId, amount, method, note }) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        project.paidAmount += amount;
        project.paymentAmount = 0;
        project.selectedPaymentMethod = '';
        project.paymentNote = '';
        alert(`Payment of $${amount.toFixed(2)} for "${project.title}" has been processed.`);
      }
    },

    handleContactFreelancer(projectId) {
      const freelancer = this.projects.find(p => p.id === projectId)?.freelancer || 'Freelancer';
      window.open(`/chatsystem/`, '_blank');
    },

    handleRequestUpdate(projectId) {
      const freelancer = this.projects.find(p => p.id === projectId)?.freelancer || 'Freelancer';
      window.open(`/chatsystem/`, '_blank');
    },

    exportToPDF(projectId) {
  const project = this.projects.find(p => p.id === projectId);
  if (!project) return;

  const html = `
    <html>
      <head>
        <title>${project.title} - Report</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 2rem;
            color: #000;
            background: #fff;
          }
          h1 {
            color: #001f3f;
            border-bottom: 1px solid #ccc;
          }
          p {
            margin: 0.5rem 0;
          }
          .highlight {
            color: #ffa500;
            font-weight: bold;
          }
          .section {
            margin-top: 1.5rem;
          }
        </style>
      </head>
      <body>
        <h1>${project.title}</h1>
        <div class="section">
          <p><strong>Freelancer:</strong> ${project.freelancer}</p>
          <p><strong>Description:</strong> ${project.description}</p>
          <p><strong>Start Date:</strong> ${this.formatDate(project.startDate)}</p>
        </div>
        <div class="section">
          <p><strong>Progress:</strong> <span class="highlight">${project.progress}%</span></p>
          <p><strong>Total:</strong> $${project.totalPrice.toFixed(2)}</p>
          <p><strong>Paid:</strong> $${project.paidAmount.toFixed(2)}</p>
          <p><strong>Balance:</strong> <span class="highlight">$${(project.totalPrice - project.paidAmount).toFixed(2)}</span></p>
          ${project.paymentNote ? `<p><strong>Note:</strong> ${project.paymentNote}</p>` : ''}
        </div>
      </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
};
</script>


<style scoped>
/* Color Variables */
:root {
    --primary-white: #ffffff;
    --primary-black: #1a1a1a;
    --navy-accent: #2c3e50;
    --orange-accent: #e67e22;
    --light-gray: #f8f9fa;
    --border-gray: #dee2e6;
    --success-green: #27ae60;
    --warning-orange: #f39c12;
    --danger-red: #e74c3c;
}

* {
    box-sizing: border-box;
}

.client-dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background-color: var(--primary-white);
    color: var(--primary-black);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--navy-accent);
}

.dashboard-header h1 {
    color: var(--navy-accent);
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.dashboard-header p {
    color: var(--primary-black);
    font-size: 1.1rem;
    opacity: 0.8;
}

.projects-container {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
}

.project-card {
    background: var(--primary-white);
    border: 2px solid var(--border-gray);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    border-color: var(--navy-accent);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-gray);
}

.project-header h2 {
    color: var(--navy-accent);
    font-size: 1.3rem;
    margin: 0;
    flex: 1;
}

.start-date {
    background: var(--navy-accent);
    color: var(--primary-white);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
}

.project-info {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.project-info dt {
    font-weight: 600;
    color: var(--navy-accent);
    margin-bottom: 0.25rem;
}

.project-info dd {
    margin: 0 0 1rem 0;
    padding-left: 1rem;
}

.freelancer-name {
    font-weight: 600;
    color: var(--orange-accent);
    font-size: 1.1rem;
}

.total-price {
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--navy-accent);
}

.paid-amount {
    font-weight: 700;
    color: var(--success-green);
    font-size: 1.1rem;
}

.due-amount {
    font-weight: 700;
    color: var(--danger-red);
    font-size: 1.2rem;
}

.progress-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--light-gray);
    border-radius: 8px;
}

.progress-section h3 {
    color: var(--navy-accent);
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.progress-bar {
    width: 100%;
    height: 25px;
    margin-bottom: 0.5rem;
    accent-color: var(--orange-accent);
}

.progress-bar::-webkit-progress-bar {
    background-color: var(--border-gray);
    border-radius: 12px;
}

.progress-bar::-webkit-progress-value {
    background-color: var(--orange-accent);
    border-radius: 12px;
}

.progress-display {
    display: block;
    font-weight: 700;
    color: var(--orange-accent);
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.progress-status {
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    text-align: center;
}

.status-not-started {
    background: #ecf0f1;
    color: #7f8c8d;
}

.status-in-progress {
    background: #fff3cd;
    color: #856404;
}

.status-near-completion {
    background: #d1ecf1;
    color: #0c5460;
}

.status-completed {
    background: #d4edda;
    color: #155724;
}

.payment-section,
.payment-status-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 2px solid var(--orange-accent);
    border-radius: 8px;
    background: #fdf7f0;
}

.payment-section h3,
.payment-status-section h3 {
    color: var(--orange-accent);
    margin-bottom: 1rem;
}

.paid-status {
    color: var(--success-green);
    text-align: center;
}

.payment-form {
    border: none;
    padding: 0;
    margin-bottom: 1.5rem;
}

.payment-form legend {
    font-weight: 600;
    color: var(--navy-accent);
    margin-bottom: 1rem;
}

.payment-form label {
    display: block;
    font-weight: 600;
    color: var(--navy-accent);
    margin: 1rem 0 0.5rem 0;
}

.payment-input,
.payment-select,
.payment-note {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--border-gray);
    border-radius: 6px;
    font-size: 1rem;
}

.payment-input:focus,
.payment-select:focus,
.payment-note:focus {
    outline: none;
    border-color: var(--orange-accent);
}

.payment-btn {
    width: 100%;
    padding: 1rem;
    background: var(--orange-accent);
    color: var(--primary-white);
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.payment-btn:hover:not(:disabled) {
    background: #d35400;
    transform: translateY(-1px);
}

.payment-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
}

.communication-section {
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--light-gray);
    border-radius: 8px;
}

.communication-section h3 {
    color: var(--navy-accent);
    margin-bottom: 1rem;
}

.contact-btn,
.update-btn {
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--navy-accent);
    background: var(--primary-white);
    color: var(--navy-accent);
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.contact-btn:hover,
.update-btn:hover {
    background: var(--navy-accent);
    color: var(--primary-white);
}

.project-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    flex-wrap: wrap;
}

.details-btn,
.invoice-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
}

.export-btn {
    background: var(--primary-white);
    color: var(--navy-accent);
    border: 2px solid var(--navy-accent);
}

.export-btn:hover {
    background: var(--navy-accent);
    color: var(--primary-white);
    transform: translateY(-1px);
}

.details-btn {
    background: var(--navy-accent);
    color: var(--primary-white);
}

.details-btn:hover {
    background: #233647;
    transform: translateY(-1px);
}

.invoice-btn {
    background: var(--primary-white);
    color: var(--orange-accent);
    border: 2px solid var(--orange-accent);
}

.invoice-btn:hover {
    background: var(--orange-accent);
    color: var(--primary-white);
    transform: translateY(-1px);
}

/* Payment Modal */
.payment-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    /* Darker overlay */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    /* Ensure it's on top */
    animation: fadeIn 0.3s ease-out;
}

.modal-content {
    background: #ffffff;
    /* Bright modal */
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
    /* Stronger shadow */
    border: 1px solid var(--border-gray);
    /* Optional subtle border */
}

/* Fade-in animation */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.modal-header h2 {
    color: var(--navy-accent);
    margin-bottom: 1rem;
}

.modal-body {
    margin-bottom: 2rem;
}

.modal-body p {
    margin-bottom: 0.5rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.confirm-btn {
    background: var(--success-green);
    color: var(--primary-white);
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}

.cancel-btn {
    background: var(--primary-white);
    color: var(--danger-red);
    border: 2px solid var(--danger-red);
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
    .client-dashboard {
        padding: 1rem;
    }

    .projects-container {
        grid-template-columns: 1fr;
    }

    .project-header {
        flex-direction: column;
        gap: 1rem;
    }

    .project-actions {
        flex-direction: column;
    }

    .contact-btn,
    .update-btn {
        margin-right: 0;
        width: 100%;
    }

    .modal-content {
        margin: 1rem;
    }

    .modal-actions {
        flex-direction: column;
    }
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