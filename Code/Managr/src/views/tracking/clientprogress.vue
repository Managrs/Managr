<template>
  <article class="project-card">
    <header class="project-header">
      <h2>{{ title }}</h2>
      <!--<time class="start-date" :datetime="startDate">
        Started: {{ formatDate(startDate) }}
      </time>-->
    </header>

    <section class="project-details">
      <dl class="project-info">
        <dt>Freelancer:</dt>
        <dd class="freelancer-name">{{ freelancer }}</dd>

        <dt>Description:</dt>
        <dd>{{ description }}</dd>

        <dt>Total Project Value:</dt>
        <dd class="total-price">${{ totalPrice.toFixed(2) }}</dd>

        <dt>Amount Paid:</dt>
        <dd class="paid-amount">${{ paidAmount.toFixed(2) }}</dd>

        <dt>Amount Due:</dt>
        <dd class="due-amount">${{ amountDue.toFixed(2) }}</dd>
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
      v-if="amountDue > 0"
    >
      <h3>Make Payment</h3>

      <fieldset class="payment-form">
        <legend>Payment Details</legend>

        <label for="payment-amount">Payment Amount:</label>
        <input 
          id="payment-amount" 
          type="number" 
          :max="amountDue" 
          min="0"
          step="0.01" 
          :value="paymentAmount" 
          @input="updatePaymentAmount($event.target.value)"
          class="payment-input"
          :placeholder="`Max: $${amountDue.toFixed(2)}`"
        >

        <label for="payment-method">Payment Method:</label>
        <select 
          id="payment-method" 
          :value="selectedPaymentMethod" 
          @change="updatePaymentMethod($event.target.value)"
          class="payment-select"
        >
          <option value="">Select payment method</option>
          <option 
            v-for="method in paymentMethods" 
            :key="method.value" 
            :value="method.value"
          >
            {{ method.label }}
          </option>
        </select>

      </fieldset>

      <button 
        @click="makePayment" 
        :disabled="!canMakePayment" 
        class="payment-btn"
      >
        Make Payment of ${{ (paymentAmount || 0).toFixed(2) }}
      </button>
    </section>

    <section class="payment-status-section" v-else>
      <h3 class="paid-status">✓ Project Fully Paid</h3>
      <p>All payments have been completed for this project.</p>
    </section>

    <section class="communication-section">
      <h3>Project Communication</h3>
      <button @click="contactFreelancer" class="contact-btn">
        Contact {{ freelancer }}
      </button>
      <button @click="requestUpdate" class="update-btn">
        Request Progress Update
      </button>
    </section>

    <footer class="project-actions">
      <button @click="exportToPDF" class="invoice-btn">
        Export to PDF
      </button>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'ClientProjectCard',
  props: {
    projectId: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    freelancer: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    paidAmount: {
      type: Number,
      required: true
    },
    progress: {
      type: Number,
      required: true
    },
    /*startDate: {
      type: String,
      required: true
    },*/
    paymentAmount: {
      type: [Number, String],
      default: 0
    },
    selectedPaymentMethod: {
      type: String,
      default: ''
    },
    paymentMethods: {
      type: Array,
      default: () => [
        { value: 'EFT', label: 'EFT' },
        { value: 'paypal', label: 'PayPal' }
      ]
    }
  },

  emits: [
    'make-payment',
    'contact-freelancer',
    'request-update',
    'export-pdf',
    'update-payment-amount',
    'update-payment-method',
    'update-payment-note'
  ],

  computed: {
    amountDue() {
      return this.totalPrice - this.paidAmount;
    },

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

    canMakePayment() {
      return (
        this.paymentAmount > 0 &&
        this.paymentAmount <= this.amountDue &&
        this.selectedPaymentMethod
      );
    }
  },

  methods: {
    makePayment() {
      if (this.canMakePayment) {
        this.$emit('make-payment', {
          projectId: this.projectId,
          amount: parseFloat(this.paymentAmount),
          method: this.selectedPaymentMethod,
          note: this.paymentNote
        });
      }
    },

    contactFreelancer() {
      this.$emit('contact-freelancer', this.projectId);
    },

    requestUpdate() {
      this.$emit('request-update', this.projectId);
    },

    exportToPDF() {
      this.$emit('export-pdf', this.projectId);
    },

    updatePaymentAmount(value) {
      this.$emit('update-payment-amount', parseFloat(value) || 0);
    },

    updatePaymentMethod(value) {
      this.$emit('update-payment-method', value);
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