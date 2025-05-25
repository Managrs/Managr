<template>
  <article class="project-card">
    <header class="project-header">
      <h2>{{ title }}</h2>
    </header>

    <section class="project-details">
      <dl class="project-info">
        <dt>Freelancer:</dt>
        <dd class="freelancer-name">{{ clientName }}</dd>

        <dt>Description:</dt>
        <dd>{{ description }}</dd>

        <dt>Total Project Value:</dt>
        <dd class="total-price">${{ totalPrice.toFixed(2) }}</dd>

        <dt>Amount Paid:</dt>
        <dd class="paid-amount">${{ (totalPrice - Amountdue).toFixed(2) }}</dd>

        <dt>Amount Due:</dt>
        <dd class="due-amount">${{ Amountdue.toFixed(2) }}</dd>
      </dl>
    </section>

    <section class="progress-section">
      <h3>Project Progress</h3>
      <progress :value="progress" max="100" class="progress-bar">
        {{ progress }}%
      </progress>
      <output class="progress-display">{{ progress }}% Complete</output>

      <p class="progress-status" :class="progressStatusClass">
        {{ progressStatusText }}
      </p>
    </section>

    <section 
      class="payment-section" 
      v-if="Amountdue > 0"
    >
      <h3>Make Payment</h3>
      <form @submit.prevent="submitGig">
        <label for="paymentAmount" class="payment-label">Enter Amount</label><br>
            <input
              id="paymentAmount"
              type="number"
              v-model.number="paymentAmount"
              :max="Amountdue"
              min="100"
              required
              step="100"
              placeholder="Payment amount"
              class="payment-input"
            /><br>

        <button class="hire-button" type="submit" :disabled="paymentAmount <= 0 || paymentAmount > Amountdue">
          Pay
        </button>
      </form>

    </section>

    <footer class="project-actions">
      <button @click="exportToPDF" class="hire-button">
        Export to PDF
      </button>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'ClientProjectCard',
  
    data() {
    return {
      id: "",
      title: this.$route.query.jobTitle,
      clientName: this.$route.query.clientName,
      description: this.$route.query.jobDesc,
      totalPrice: 0,
      Amountdue: 0,
      paymentAmount: 0,
      progress: 0,
      loaded: false
    };

  },

  methods: {
      async fetchProject() {
      try {
        const backendUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${backendUrl}/getprogress?email=${this.$route.query.clientMail}&Title=${this.title}&Description=${this.description}`);
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
    
    async submitGig() {
        try {
        const payload = {
          progressid: this.id,
          Amountdue: this.Amountdue - this.paymentAmount
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/setmilestone`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Failed to update progress');

        alert('Due Amount updated successfully!'); 

      } catch (err) {
        console.error('Error updating progress:', err);
        alert('Failed to update progress: ' + err.message);
      }
    },

    exportToPDF() {
  const html = `
    <html>
      <head>
        <title>${this.title} - Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            color: #000;
            background: #fff;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            color: #001f3f;
            border-bottom: 2px solid #ccc;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
          }
          p {
            margin: 0.5rem 0;
            line-height: 1.6;
          }
          .highlight {
            color: #ffa500;
            font-weight: bold;
          }
          .section {
            margin-top: 1.5rem;
            padding: 1rem;
            border-left: 4px solid #001f3f;
            padding-left: 1.5rem;
          }
          .progress-section {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
          }
          .footer {
            margin-top: 2rem;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
            border-top: 1px solid #ccc;
            padding-top: 1rem;
          }
          @media print {
            body { padding: 1rem; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${this.title}</h1>
        
        <div class="section">
          <h3>Project Details</h3>
          <p><strong>Freelancer:</strong> ${this.clientName}</p>
          <p><strong>Description:</strong> ${this.description}</p>
        </div>
        
        <div class="section">
          <h3>Financial Summary</h3>
          <p><strong>Total Project Value:</strong> $${this.totalPrice.toFixed(2)}</p>
          <p><strong>Amount Paid:</strong> $${(this.totalPrice - this.Amountdue).toFixed(2)}</p>
          <p><strong>Amount Due:</strong> <span class="highlight">$${this.Amountdue.toFixed(2)}</span></p>
        </div>
        
        <div class="progress-section">
          <h3>Project Progress</h3>
          <p><strong>Progress:</strong> <span class="highlight">${this.progress}% Complete</span></p>
          <div style="width: 100%; background: #ddd; border-radius: 10px; height: 20px; margin: 1rem 0;">
            <div style="width: ${this.progress}%; background: #ffa500; height: 20px; border-radius: 10px;"></div>
          </div>
        </div>
        
        <div class="footer">
          <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
      </body>
    </html>
  `;
  
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
    }, 500);
  } else {
    // Fallback if popup is blocked
    alert('Please allow popups to export PDF. You can also try using Ctrl+P to print this page.');
  }
},
  },

  computed: {
    progressStatusClass() {
      if (this.progress >= 90) return 'status-complete';
      if (this.progress >= 70) return 'status-near-complete';
      if (this.progress >= 40) return 'status-in-progress';
      return 'status-just-started';
    },
    progressStatusText() {
      if (this.progress >= 90) return 'Nearly Complete';
      if (this.progress >= 70) return 'Well Underway';
      if (this.progress >= 40) return 'In Progress';
      if (this.progress >= 10) return 'Getting Started';
      return 'Just Started';
    },
  },
  
  mounted() {
    this.paymentAmount = 0;
    this.fetchProject();
  }
}
</script>

<style scoped>
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

.project-card {
  background-color: #ffffff; /* White */
  border: 2px solid #001f3f; /* Navy */
  border-radius: 10px;
  padding: 1.5rem;
  color: #000000; /* Black text */
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
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

.freelancer-name {
  color: var(--orange-accent);
  font-weight: 600;
}

.total-price, .paid-amount, .due-amount {
  font-weight: 700;
  font-size: 1.1rem;
}

.total-price {
  color: var(--navy-accent);
}

.paid-amount {
  color: var(--success-green);
}

.due-amount {
  color: var(--warning-orange);
}

.progress-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--light-gray);
  border-radius: 8px;
}

.progress-section h3 {
  color: var(--navy-accent);
  margin-bottom: 1rem;
}

.progress-bar {
  width: 100%;
  height: 20px;
  margin: 0.5rem 0;
  accent-color: var(--orange-accent);
}

.progress-display {
  display: block;
  font-weight: 700;
  color: var(--orange-accent);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.progress-status {
  font-weight: 600;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.status-complete {
  background: #d4edda;
  color: #155724;
}

.status-near-complete {
  background: #d1ecf1;
  color: #0c5460;
}

.status-in-progress {
  background: #fff3cd;
  color: #856404;
}

.status-just-started {
  background: #f8d7da;
  color: #721c24;
}

.payment-section {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border: 2px solid var(--border-gray);
  border-radius: 8px;
}

.payment-section h3 {
  color: var(--navy-accent);
  margin-bottom: 1rem;
}

.payment-form {
  border: none;
  padding: 0;
  margin-bottom: 1rem;
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

.payment-input, .payment-select, .payment-note {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-gray);
  border-radius: 6px;
  font-size: 1rem;
}

.payment-input:focus, .payment-select:focus, .payment-note:focus {
  outline: none;
  border-color: var(--orange-accent);
}

.payment-btn {
  width: 100%;
  padding: 1rem;
  background: var(--success-green);
  color: var(--primary-white);
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-btn:hover:not(:disabled) {
  background: #229954;
  transform: translateY(-1px);
}

.payment-btn:disabled {
  background: var(--border-gray);
  color: #6c757d;
  cursor: not-allowed;
}

.payment-status-section {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #d4edda;
  border: 2px solid var(--success-green);
  border-radius: 8px;
  text-align: center;
}

.paid-status {
  color: var(--success-green);
  margin-bottom: 0.5rem;
}

.communication-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--light-gray);
  border-radius: 8px;
}

.communication-section h3 {
  color: var(--navy-accent);
  margin-bottom: 1rem;
}

.contact-btn, .update-btn {
  padding: 0.75rem 1.5rem;
  margin-right: 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.contact-btn {
  background: var(--orange-accent);
  color: var(--primary-white);
}

.contact-btn:hover {
  background: #d35400;
  transform: translateY(-1px);
}

.update-btn {
  background: var(--primary-white);
  color: var(--navy-accent);
  border: 2px solid var(--navy-accent);
}

.update-btn:hover {
  background: var(--navy-accent);
  color: var(--primary-white);
  transform: translateY(-1px);
}

.project-actions {
  display: flex;
  justify-content: center;
}

.invoice-btn {
  padding: 0.75rem 1.5rem;
  background: var(--navy-accent);
  color: var(--primary-white);
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.invoice-btn:hover {
  background: #1a252f;
  transform: translateY(-1px);
}

.hire-button{
  padding: 0.5rem 5.2rem;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  color: #fff;
}

.hire-button {
  background-color: #28a745; /* Bootstrap-style green */
}

.hire-button:hover {
  background-color: #218838;
  transform: scale(1.02);
}

.payment-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
  max-width: 300px;
  font-family: Arial, sans-serif;
}

.payment-label {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}

.payment-input {
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.payment-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.payment-input::placeholder {
  color: #999;
}

@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-btn, .update-btn {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
  }
}
</style>