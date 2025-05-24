<template>
    <main class="client-dashboard">
        <button type="button" class="secondary-btn" @click="goBack">🔙 Back</button>
        <header class="dashboard-header">
            <h1>Client Dashboard</h1>
            <p>Manage your projects and payments</p>
        </header>
        
        <section class="projects-container">
            <article v-for="project in projects" :key="project.id" class="project-card">
                <header class="project-header">
                    <h2>{{ project.title }}</h2>
                    <time class="start-date" :datetime="project.startDate">
                        Started: {{ formatDate(project.startDate) }}
                    </time>
                </header>

                <section class="project-details">
                    <dl class="project-info">
                        <dt>Freelancer:</dt>
                        <dd class="freelancer-name">{{ project.freelancer }}</dd>

                        <dt>Description:</dt>
                        <dd>{{ project.description }}</dd>

                        <dt>Total Project Value:</dt>
                        <dd class="total-price">${{ project.totalPrice.toFixed(2) }}</dd>

                        <dt>Amount Paid:</dt>
                        <dd class="paid-amount">${{ project.paidAmount.toFixed(2) }}</dd>

                        <dt>Amount Due:</dt>
                        <dd class="due-amount">${{ (project.totalPrice - project.paidAmount).toFixed(2) }}</dd>
                    </dl>
                </section>

                <section class="progress-section">
                    <h3>Project Progress</h3>
                    <progress :value="project.progress" max="100" class="progress-bar">
                        {{ project.progress }}%
                    </progress>
                    <output class="progress-display">{{ project.progress }}% Complete</output>

                    <p class="progress-status" :class="getProgressStatusClass(project.progress)">
                        {{ getProgressStatusText(project.progress) }}
                    </p>
                </section>

                <section class="payment-section" v-if="project.totalPrice - project.paidAmount > 0">
                    <h3>Make Payment</h3>

                    <fieldset class="payment-form">
                        <legend>Payment Details</legend>

                        <label for="payment-amount">Payment Amount:</label>
                        <input id="payment-amount" type="number" :max="project.totalPrice - project.paidAmount" min="0"
                            step="0.01" v-model="project.paymentAmount" class="payment-input"
                            :placeholder="`Max: $${(project.totalPrice - project.paidAmount).toFixed(2)}`">

                        <label for="payment-method">Payment Method:</label>
                        <select id="payment-method" v-model="project.selectedPaymentMethod" class="payment-select">
                            <option value="">Select payment method</option>
                            <option value="EFT">EFT</option>
                            <option value="paypal">PayPal</option>
                        </select>

                        <label for="payment-note">Payment Note (Optional):</label>
                        <textarea id="payment-note" v-model="project.paymentNote" class="payment-note"
                            placeholder="Add a note for this payment..." rows="3"></textarea>
                    </fieldset>

                    <button @click="makePayment(project.id)" :disabled="!canMakePayment(project)" class="payment-btn">
                        Make Payment of ${{ (project.paymentAmount || 0).toFixed(2) }}
                    </button>
                </section>

                <section class="payment-status-section" v-else>
                    <h3 class="paid-status">✓ Project Fully Paid</h3>
                    <p>All payments have been completed for this project.</p>
                </section>

                <section class="communication-section">
                    <h3>Project Communication</h3>
                    <button @click="contactFreelancer(project.id)" class="contact-btn">
                        Contact {{ project.freelancer }}
                    </button>
                    <button @click="requestUpdate(project.id)" class="update-btn">
                        Request Progress Update
                    </button>
                </section>

                <footer class="project-actions">
                    <button @click="exportToPDF(project.id)" class="invoice-btn">
                        Export to PDF
                    </button>
                </footer>
            </article>
        </section>

        <!-- Payment Confirmation Modal -->
        <dialog v-if="showPaymentModal" class="payment-modal" open>
            <article class="modal-content">
                <header class="modal-header">
                    <h2>Confirm Payment</h2>
                </header>

                <section class="modal-body">
                    <p><strong>Project:</strong> {{ selectedProject?.title }}</p>
                    <p><strong>Freelancer:</strong> {{ selectedProject?.freelancer }}</p>
                    <p><strong>Amount:</strong> ${{ (selectedProject?.paymentAmount || 0).toFixed(2) }}</p>
                    <p><strong>Method:</strong> {{ getPaymentMethodLabel(selectedProject?.selectedPaymentMethod) }}</p>
                </section>

                <footer class="modal-actions">
                    <button @click="confirmPayment" class="confirm-btn">
                        Confirm Payment
                    </button>
                    <button @click="cancelPayment" class="cancel-btn">
                        Cancel
                    </button>
                </footer>
            </article>
        </dialog>
    </main>
</template>

<script>
export default {
    name: 'clientTrack',
    data() {
        return {
            showPaymentModal: false,
            selectedProject: null,
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
            ]
        }
    },
    methods: {
        goBack() {
      // @ts-ignore
      this.$router.go(-1);
    },
        canMakePayment(project) {
            return project.paymentAmount > 0 &&
                project.paymentAmount <= (project.totalPrice - project.paidAmount) &&
                project.selectedPaymentMethod;
        },

        makePayment(projectId) {
            this.selectedProject = this.projects.find(p => p.id === projectId);
            this.showPaymentModal = true;
        },

        confirmPayment() {
            if (this.selectedProject) {
                // Here you would integrate with your payment processor
                this.selectedProject.paidAmount += parseFloat(this.selectedProject.paymentAmount);

                alert(`Payment of $${this.selectedProject.paymentAmount} processed successfully!`);

                // Reset payment form
                this.selectedProject.paymentAmount = null;
                this.selectedProject.selectedPaymentMethod = '';
                this.selectedProject.paymentNote = '';
            }
            this.closePaymentModal();
        },

        cancelPayment() {
            this.closePaymentModal();
        },

        closePaymentModal() {
            this.showPaymentModal = false;
            this.selectedProject = null;
        },

        contactFreelancer(projectId) {
            const messageUrl = `/chatsystem/`;
            window.open(messageUrl, '_blank');
        },


        requestUpdate(projectId) {
            console.log(`Requesting update for project ${projectId}`);
            alert('Progress update request will be sent to freelancer');
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        getProgressStatusText(progress) {
            if (progress === 0) return 'Not Started';
            if (progress < 25) return 'Just Getting Started';
            if (progress < 50) return 'Making Progress';
            if (progress < 75) return 'More Than Halfway';
            if (progress < 100) return 'Nearly Complete';
            return 'Completed';
        },

        getProgressStatusClass(progress) {
            if (progress === 0) return 'status-not-started';
            if (progress < 50) return 'status-in-progress';
            if (progress < 100) return 'status-near-completion';
            return 'status-completed';
        },

        getPaymentMethodLabel(method) {
            const methods = {
                'EFT': 'EFT',
                'paypal': 'PayPal',
            };
            return methods[method] || method;
        },

        exportToPDF(projectId) {
            const project = this.projects.find(p => p.id === projectId);
            if (project) {
                this.generatePDF(project);
            }
        },

        generatePDF(project) {
            const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Client Report - ${project.title}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; color: #1a1a1a; }
        .header { text-align: center; border-bottom: 2px solid #2c3e50; margin-bottom: 30px; }
        h1 { color: #2c3e50; }
        .info { margin-bottom: 20px; }
        .info div { margin-bottom: 8px; }
        .section { margin: 30px 0; padding: 20px; border-radius: 8px; background: #f4f4f4; }
        .section h3 { margin-bottom: 15px; color: #2c3e50; }
        .label { font-weight: bold; }
        .progress-bar { height: 20px; background: #ddd; border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; background: #e67e22; width: ${project.progress}%; }
        .footer { margin-top: 40px; text-align: center; font-size: 0.9em; color: #999; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Project Overview for ${project.client}</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>

      <div class="info">
        <div><span class="label">Project Title:</span> ${project.title}</div>
        <div><span class="label">Freelancer:</span> ${project.freelancer}</div>
        <div><span class="label">Start Date:</span> ${this.formatDate(project.startDate)}</div>
        <div><span class="label">Due Date:</span> ${this.formatDate(project.dueDate)}</div>
        <div><span class="label">Description:</span> ${project.description}</div>
      </div>

      <div class="section">
        <h3>Progress</h3>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <p><strong>${project.progress}% Complete</strong> – ${this.getProgressStatusText(project.progress)}</p>
      </div>

      <div class="section">
        <h3>Financial Summary</h3>
        <p><strong>Total Project Value:</strong> $${project.totalPrice.toFixed(2)}</p>
        <p><strong>Amount Paid:</strong> $${project.paidAmount.toFixed(2)}</p>
        <p><strong>Remaining Balance:</strong> $${(project.totalPrice - project.paidAmount).toFixed(2)}</p>
        <p><strong>Payment Confirmed:</strong> ${project.paymentReceived ? 'Yes' : 'No'}</p>
        ${project.selectedPaymentMethod ? `<p><strong>Payment Method:</strong> ${this.getPaymentMethodLabel(project.selectedPaymentMethod)}</p>` : ''}
        ${project.paymentNote ? `<p><strong>Payment Note:</strong> ${project.paymentNote}</p>` : ''}
      </div>

      <div class="section">
        <h3>Communication</h3>
        <p>To contact your freelancer or request a progress update, please use the dashboard tools or email them directly.</p>
      </div>

      <div class="footer">
        <p>Generated for ${project.client} via the Freelancer Client Dashboard</p>
        <p>Report ID: ${project.id}-${Date.now()}</p>
      </div>
    </body>
    </html>
  `;

            const printWindow = window.open('', '_blank');
            printWindow.document.write(pdfContent);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => printWindow.print(), 250);
        }


    }
}
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