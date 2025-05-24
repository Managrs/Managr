<template>
  <article class="project-card">
    <header class="project-header">
      <h2>{{ title }}</h2>
      <!--<time class="due-date" :datetime="dueDate">
        Due: {{ formatDate(dueDate) }}
      </time>-->
    </header>

    <section class="project-details">
      <dl class="project-info">
        <dt>Client:</dt>
        <dd>{{ client }}</dd>

        <dt>Description:</dt>
        <dd>{{ description }}</dd>

        <dt>Total Price:</dt>
        <dd class="price">${{ totalPrice.toFixed(2) }}</dd>

        <dt>Paid Amount:</dt>
        <dd class="paid-amount">${{ paidAmount.toFixed(2) }}</dd>

        <dt>Remaining:</dt>
        <dd class="remaining-amount">${{ (totalPrice - paidAmount).toFixed(2) }}</dd>
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
      >
      <output class="progress-display">{{ progress }}%</output>

      <progress
        :value="progress"
        max="100"
        class="progress-bar"
      >
        {{ progress }}%
      </progress>
    </section>

    <section class="payment-section">
      <fieldset class="payment-status">
        <legend>Payment Status</legend>

        <button
          @click="confirmPayment"
          :class="paymentButtonClass"
          :disabled="isPaymentFullyConfirmed"
          class="payment-confirm-btn"
        >
          {{ paymentButtonText }}
        </button>

        <p class="payment-info">
          {{ paymentStatusMessage }}
        </p>
      </fieldset>
    </section>

    <footer class="project-actions">
      <button @click="saveProject" class="save-btn">
        Save Changes
      </button>
      <button @click="exportToPDF" class="export-btn">
        Export to PDF
      </button>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    id: Number,
    title: String,
    /*dueDate: String,*/
    client: String,
    description: String,
    totalPrice: Number,
    paidAmount: Number,
    paymentsConfirmed: Number,
    progress: Number
  },
  emits: ['update-progress', 'confirm-payment', 'save-project', 'export-pdf'],

  computed: {
    isPaymentFullyConfirmed() {
      return this.paymentsConfirmed >= this.totalPrice;
    },

    paymentButtonClass() {
      if (this.isPaymentFullyConfirmed) {
        return 'payment-confirmed-complete';
      } else if (this.paidAmount > this.paymentsConfirmed) {
        return 'payment-pending-confirmation';
      } else {
        return 'payment-waiting';
      }
    },

    paymentButtonText() {
      if (this.isPaymentFullyConfirmed) {
        return '✓ All Payments Confirmed';
      } else if (this.paidAmount > this.paymentsConfirmed) {
        const pendingAmount = this.paidAmount - this.paymentsConfirmed;
        return `Confirm Payment ($${pendingAmount.toFixed(2)})`;
      } else {
        return 'Waiting for Payment';
      }
    },

    paymentStatusMessage() {
      const remaining = this.totalPrice - this.paidAmount;

      if (this.isPaymentFullyConfirmed) {
        return 'All payments have been received and confirmed.';
      } else if (this.paidAmount > this.paymentsConfirmed) {
        return `$${(this.paidAmount - this.paymentsConfirmed).toFixed(2)} payment received, awaiting confirmation.`;
      } else if (remaining > 0) {
        return `Waiting for $${remaining.toFixed(2)} payment from client.`;
      } else {
        return 'No pending payments.';
      }
    }
  },

  methods: {
    updateProgress(newProgress) {
      this.$emit('update-progress', this.id, parseInt(newProgress));
    },

    confirmPayment() {
      this.$emit('confirm-payment', this.id);
    },

    saveProject() {
      this.$emit('save-project', this.id);
    },

    exportToPDF() {
      this.$emit('export-pdf', this.id);
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
.project-card {
  background-color: #ffffff; /* White */
  border: 2px solid #001f3f; /* Navy */
  border-radius: 10px;
  padding: 1.5rem;
  color: #000000; /* Black text */
  max-width: 700px;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.project-header h2 {
  margin: 0;
  font-size: 1.75rem;
  color: #001f3f; /* Navy heading */
}

.due-date {
  font-size: 0.9rem;
  color: #666666;
}

.project-info dt {
  font-weight: bold;
  margin-top: 0.5rem;
  color: #000000;
}

.project-info dd {
  margin: 0 0 0.5rem 0;
  color: #333333;
}

.price,
.paid-amount,
.remaining-amount {
  font-weight: bold;
}

.progress-section {
  margin-top: 1.5rem;
}

.progress-slider {
  width: 100%;
  margin: 0.5rem 0;
  accent-color: #ffa500; /* Orange accent for slider */
}

.progress-display {
  display: inline-block;
  margin-left: 0.5rem;
  font-weight: bold;
}

.progress-bar {
  width: 100%;
  height: 10px;
  margin-top: 0.5rem;
  background-color: #e0e0e0;
  border-radius: 5px;
  color: #000000;
}

.payment-section {
  margin-top: 1.5rem;
}

.payment-status legend {
  font-weight: bold;
  color: #001f3f; /* Navy */
}

.payment-confirm-btn {
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: #ffffff;
  background-color: #ffa500; /* Orange */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.payment-confirmed-complete {
  background-color: #2c3e50; /* Dark navy */
}

.payment-pending-confirmation {
  background-color: #ffa500; /* Orange */
}

.payment-waiting {
  background-color: #888888;
}

.payment-info {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #333;
}

.project-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.save-btn,
.export-btn {
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #001f3f; /* Navy */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.save-btn:hover,
.export-btn:hover {
  background-color: #003366; /* Deeper navy on hover */
}
</style>

