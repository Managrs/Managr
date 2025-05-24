<template>
    <button type="button" class="secondary-btn" @click="goBack">🔙 Back</button>
  <main class="freelancer-dashboard">
    <header class="dashboard-header">
      <h1>Project Dashboard</h1>
      <p>Track your freelance projects and tasks</p>
    </header>

    <section class="projects-container">
      <article 
        v-for="project in projects" 
        :key="project.id" 
        class="project-card"
      >
        <header class="project-header">
          <h2>{{ project.title }}</h2>
          <time class="due-date" :datetime="project.dueDate">
            Due: {{ formatDate(project.dueDate) }}
          </time>
        </header>

        <section class="project-details">
          <dl class="project-info">
            <dt>Client:</dt>
            <dd>{{ project.client }}</dd>
            
            <dt>Description:</dt>
            <dd>{{ project.description }}</dd>
            
            <dt>Total Price:</dt>
            <dd class="price">${{ project.totalPrice.toFixed(2) }}</dd>
            
            <dt>Paid Amount:</dt>
            <dd class="paid-amount">${{ project.paidAmount.toFixed(2) }}</dd>
            
            <dt>Remaining:</dt>
            <dd class="remaining-amount">${{ (project.totalPrice - project.paidAmount).toFixed(2) }}</dd>
          </dl>
        </section>

        <section class="progress-section">
          <label for="progress-input">Progress:</label>
          <input 
            id="progress-input"
            type="range" 
            min="0" 
            max="100" 
            v-model="project.progress"
            @input="updateProgress(project.id, $event.target.value)"
            class="progress-slider"
          >
          <output class="progress-display">{{ project.progress }}%</output>
          
          <progress 
            :value="project.progress" 
            max="100" 
            class="progress-bar"
          >
            {{ project.progress }}%
          </progress>
        </section>

        <section class="payment-section">
          <fieldset class="payment-status">
            <legend>Payment Confirmation</legend>
            
            <button 
              @click="confirmPayment(project.id)"
              :class="getPaymentButtonClass(project)"
              :disabled="isPaymentFullyConfirmed(project)"
              class="payment-confirm-btn"
            >
              {{ getPaymentButtonText(project) }}
            </button>
            
            <p class="payment-info">
              {{ getPaymentStatusMessage(project) }}
            </p>
          </fieldset>
        </section>

        <footer class="project-actions">
          <button 
            @click="saveProject(project.id)"
            class="save-btn"
          >
            Save Changes
          </button>
          <button 
            @click="exportToPDF(project.id)"
            class="export-btn"
          >
            Export to PDF
          </button>
        </footer>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  name: 'FreelanceTrack',
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'E-commerce Website Development',
          client: 'Tech Solutions Inc.',
          description: 'Build a responsive e-commerce platform with payment integration',
          totalPrice: 2500.00,
          paidAmount: 1000.00,
          progress: 65,
          paymentReceived: false,
          paymentsConfirmed: 1000.00, // Amount of payments confirmed by freelancer
          dueDate: '2024-06-15'
        },
        {
          id: 2,
          title: 'Mobile App UI Design',
          client: 'StartupXYZ',
          description: 'Design modern UI/UX for fitness tracking mobile application',
          totalPrice: 1800.00,
          paidAmount: 600.00,
          progress: 30,
          paymentReceived: false,
          paymentsConfirmed: 0.00,
          dueDate: '2024-06-30'
        },
        {
          id: 3,
          title: 'Brand Identity Package',
          client: 'Local Restaurant',
          description: 'Complete brand identity including logo, colors, and style guide',
          totalPrice: 1200.00,
          paidAmount: 1200.00,
          progress: 100,
          paymentReceived: true,
          paymentsConfirmed: 1200.00,
          dueDate: '2024-05-20'
        }
      ]
    }
  },
  methods: {
    goBack() {
      // @ts-ignore
      this.$router.go(-1);
    },
    updateProgress(projectId, newProgress) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        project.progress = parseInt(newProgress);
      }
    },
    
    confirmPayment(projectId) {
      const project = this.projects.find(p => p.id === projectId);
      if (project && project.paidAmount > project.paymentsConfirmed) {
        const unconfirmedAmount = project.paidAmount - project.paymentsConfirmed;
        project.paymentsConfirmed = project.paidAmount;
        
        // Check if all payments are now confirmed
        if (project.paymentsConfirmed >= project.totalPrice) {
          project.paymentReceived = true;
        }
        
        alert(`Payment of $${unconfirmedAmount.toFixed(2)} confirmed successfully!`);
      }
    },
    
    isPaymentFullyConfirmed(project) {
      return project.paymentsConfirmed >= project.totalPrice;
    },
    
    getPaymentButtonClass(project) {
      if (this.isPaymentFullyConfirmed(project)) {
        return 'payment-confirmed-complete';
      } else if (project.paidAmount > project.paymentsConfirmed) {
        return 'payment-pending-confirmation';
      } else {
        return 'payment-waiting';
      }
    },
    
    getPaymentButtonText(project) {
      if (this.isPaymentFullyConfirmed(project)) {
        return '✓ All Payments Confirmed';
      } else if (project.paidAmount > project.paymentsConfirmed) {
        const pendingAmount = project.paidAmount - project.paymentsConfirmed;
        return `Confirm Payment ($${pendingAmount.toFixed(2)})`;
      } else {
        return 'Waiting for Payment';
      }
    },
    
    getPaymentStatusMessage(project) {
      const totalPaid = project.paidAmount;
      const confirmed = project.paymentsConfirmed;
      const remaining = project.totalPrice - totalPaid;
      
      if (this.isPaymentFullyConfirmed(project)) {
        return 'All payments have been received and confirmed.';
      } else if (totalPaid > confirmed) {
        return `$${(totalPaid - confirmed).toFixed(2)} payment received, awaiting your confirmation.`;
      } else if (remaining > 0) {
        return `Waiting for $${remaining.toFixed(2)} payment from client.`;
      } else {
        return 'No pending payments.';
      }
    },
    
    saveProject(projectId) {
      console.log(`Saving project ${projectId}`);
      alert('Project saved successfully!');
    },
    
    exportToPDF(projectId) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        this.generatePDF(project);
      }
    },
    
    generatePDF(project) {
      // Create PDF content as HTML string
      const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Project Details - ${project.title}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px;
              color: #1a1a1a;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #2c3e50; 
              padding-bottom: 20px; 
              margin-bottom: 30px;
            }
            .header h1 { 
              color: #2c3e50; 
              margin-bottom: 10px;
            }
            .info-grid { 
              display: grid; 
              gap: 15px; 
              margin-bottom: 30px;
            }
            .info-item { 
              border-left: 4px solid #e67e22; 
              padding-left: 15px;
            }
            .info-label { 
              font-weight: bold; 
              color: #2c3e50; 
              margin-bottom: 5px;
            }
            .info-value { 
              font-size: 1.1em;
            }
            .progress-section {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .financial-summary {
              background: #e8f4fd;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #2c3e50;
            }
            .price { color: #2c3e50; font-weight: bold; }
            .paid { color: #27ae60; font-weight: bold; }
            .remaining { color: #e67e22; font-weight: bold; }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #7f8c8d;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Project Details Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Project Title:</div>
              <div class="info-value">${project.title}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Client:</div>
              <div class="info-value">${project.client}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Description:</div>
              <div class="info-value">${project.description}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Due Date:</div>
              <div class="info-value">${this.formatDate(project.dueDate)}</div>
            </div>
          </div>
          
          <div class="progress-section">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Project Progress</h3>
            <div style="background: #dee2e6; height: 25px; border-radius: 12px; overflow: hidden;">
              <div style="background: #e67e22; height: 100%; width: ${project.progress}%; border-radius: 12px;"></div>
            </div>
            <p style="margin-top: 10px; font-weight: bold; color: #e67e22;">${project.progress}% Complete</p>
          </div>
          
          <div class="financial-summary">
            <h3 style="color: #2c3e50; margin-bottom: 20px;">Financial Summary</h3>
            <div style="display: grid; gap: 10px;">
              <div>Total Project Value: <span class="price">$${project.totalPrice.toFixed(2)}</span></div>
              <div>Amount Paid: <span class="paid">$${project.paidAmount.toFixed(2)}</span></div>
              <div>Amount Confirmed: <span class="paid">$${project.paymentsConfirmed.toFixed(2)}</span></div>
              <div>Remaining Balance: <span class="remaining">$${(project.totalPrice - project.paidAmount).toFixed(2)}</span></div>
            </div>
          </div>
          
          <div class="footer">
            <p>This report was generated by the Freelancer Dashboard System</p>
            <p>Report ID: ${project.id}-${Date.now()}</p>
          </div>
        </body>
        </html>
      `;
      
      // Create a new window/tab and write the PDF content
      const printWindow = window.open('', '_blank');
      printWindow.document.write(pdfContent);
      printWindow.document.close();
      
      // Trigger print dialog (which allows saving as PDF)
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
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

.freelancer-dashboard {
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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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

.due-date {
  background: var(--orange-accent);
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

.price, .paid-amount, .remaining-amount {
  font-weight: 700;
  font-size: 1.1rem;
}

.price {
  color: var(--navy-accent);
}

.paid-amount {
  color: var(--success-green);
}

.remaining-amount {
  color: var(--orange-accent);
}

.progress-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--light-gray);
  border-radius: 8px;
}

.progress-section label {
  display: block;
  font-weight: 600;
  color: var(--navy-accent);
  margin-bottom: 0.5rem;
}

.progress-slider {
  width: 100%;
  margin: 0.5rem 0;
  accent-color: var(--orange-accent);
}

.progress-display {
  display: inline-block;
  font-weight: 700;
  color: var(--orange-accent);
  font-size: 1.1rem;
  margin-left: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 20px;
  margin-top: 0.5rem;
  accent-color: var(--orange-accent);
}

.progress-bar::-webkit-progress-bar {
  background-color: var(--border-gray);
  border-radius: 10px;
}

.progress-bar::-webkit-progress-value {
  background-color: var(--orange-accent);
  border-radius: 10px;
}

.payment-section {
  margin-bottom: 2rem;
}

.payment-status {
  border: 2px solid var(--border-gray);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.payment-status legend {
  font-weight: 600;
  color: var(--navy-accent);
  padding: 0 0.5rem;
  font-size: 1.1rem;
}

.payment-confirm-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.payment-pending-confirmation {
  background: var(--warning-orange);
  color: var(--primary-white);
  animation: pulse 2s infinite;
}

.payment-pending-confirmation:hover {
  background: #e67e22;
  transform: translateY(-1px);
}

.payment-waiting {
  background: var(--border-gray);
  color: #6c757d;
  cursor: not-allowed;
}

.payment-confirmed-complete {
  background: var(--success-green);
  color: var(--primary-white);
  cursor: default;
}

.payment-confirmed-complete:disabled {
  opacity: 1;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(243, 156, 18, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(243, 156, 18, 0); }
  100% { box-shadow: 0 0 0 0 rgba(243, 156, 18, 0); }
}

.payment-info {
  color: var(--navy-accent);
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

.project-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.save-btn, .export-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.save-btn {
  background: var(--orange-accent);
  color: var(--primary-white);
}

.save-btn:hover {
  background: #d35400;
  transform: translateY(-1px);
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

/* Responsive Design */
@media (max-width: 768px) {
  .freelancer-dashboard {
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
  
  .save-btn, .export-btn {
    width: 100%;
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