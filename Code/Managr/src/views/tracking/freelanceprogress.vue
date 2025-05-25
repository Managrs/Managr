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
        <dd class="remaining-amount">${{ (totalPrice - Amountdue).toFixed(2) }}</dd>
      </dl>
    </section>

    <section class="progress-section">
      <label>Progress:</label>
      <input type="range" min="0" max="100" :value="progress" @input="updateProgress($event.target.value)"
        class="progress-slider" />
      <output class="progress-display">{{ progress }}%</output>

      <progress :value="progress" max="100" class="progress-bar">
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
        this.totalPrice = project.jobBudget;
        this.Amountdue = project.Amountdue;
        this.progress = project.progress;
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
  try {
    const reportData = {
      title: this.title || 'Untitled Project',
      clientName: this.clientName || 'Unknown Client',
      description: this.description || 'No description provided',
      totalPrice: this.totalPrice || 0,
      amountDue: this.Amountdue || 0,
      paidAmount: (this.totalPrice - this.Amountdue) || 0,
      progress: this.progress || 0,
      projectId: this.id || 'N/A'
    };

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${reportData.title} - Project Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 2rem;
              color: #1a1a1a;
              background: #fff;
              max-width: 800px;
              margin: auto;
              line-height: 1.6;
            }
            header, section, footer {
              margin-bottom: 2rem;
            }
            header h1 {
              font-size: 2rem;
              color: #2c3e50;
            }
            header p.subtitle {
              color: #666;
            }
            article {
              border: 1px solid #ccc;
              padding: 1.5rem;
              border-radius: 10px;
              background: #f9f9f9;
            }
            h2 {
              border-bottom: 2px solid #ddd;
              padding-bottom: 0.5rem;
              margin-bottom: 1rem;
              color: #2c3e50;
            }
            dl {
              display: grid;
              grid-template-columns: max-content 1fr;
              gap: 0.5rem 1rem;
            }
            dt {
              font-weight: bold;
              color: #333;
            }
            dd {
              margin: 0;
            }
            .progress-container {
              margin-top: 1rem;
            }
            .progress-bar {
              width: 100%;
              background: #ddd;
              border-radius: 5px;
              overflow: hidden;
              height: 24px;
              margin-bottom: 0.5rem;
            }
            .progress-fill {
              height: 100%;
              width: ${reportData.progress}%;
              background: linear-gradient(90deg, #e67e22, #f39c12);
              transition: width 0.3s ease;
            }
            .highlight {
              font-weight: bold;
              color: #e67e22;
            }
            aside {
              background: #f4f4f4;
              padding: 1rem;
              border-left: 4px solid #ccc;
              margin-top: 2rem;
            }
            footer {
              text-align: center;
              font-size: 0.9rem;
              color: #666;
              border-top: 2px solid #2c3e50;
              padding-top: 1rem;
            }
            @media print {
              body {
                padding: 1rem;
              }
              article {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <header>
            <h1>${reportData.title}</h1>
            <p class="subtitle">Project Status Report</p>
          </header>

          <article>
            <section>
              <h2>Project Information</h2>
              <dl>
                <dt>Client:</dt>
                <dd>${reportData.clientName}</dd>
                <dt>Description:</dt>
                <dd>${reportData.description}</dd>
              </dl>
            </section>

            <section>
              <h2>Financial Summary</h2>
              <dl>
                <dt>Total Project Value:</dt>
                <dd>$${reportData.totalPrice.toFixed(2)}</dd>
                <dt>Amount Paid:</dt>
                <dd>$${reportData.paidAmount.toFixed(2)}</dd>
                <dt>Amount Remaining:</dt>
                <dd>$${reportData.amountDue.toFixed(2)}</dd>
                <dt>Payment Progress:</dt>
                <dd class="highlight">${((reportData.paidAmount / reportData.totalPrice) * 100).toFixed(1)}% Paid</dd>
              </dl>
            </section>
            <section>
              <h2>Project Progress</h2>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill"></div>
                </div>
                <p><strong>${reportData.progress}% Complete</strong></p>
                <p>Status: <span class="highlight">${
                  reportData.progress >= 90 ? 'Nearly Complete' :
                  reportData.progress >= 70 ? 'Well Underway' :
                  reportData.progress >= 40 ? 'In Progress' :
                  reportData.progress >= 10 ? 'Getting Started' : 'Just Started'
                }</span></p>
              </div>
            </section>
          </article>
          <aside>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </aside>
          <footer>
            Report generated by Freelance Project Management System
          </footer>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 750);
    } else {
      throw new Error('Popup blocked');
    }
  } catch (error) {
    console.error('PDF Export Error:', error);
    alert(`Unable to export PDF due to popup blockers.

      Please try:
      1. Allow popups for this site
      2. Use Ctrl+P (Cmd+P on Mac) to print
      3. Try again

Error: ${error.message}`);
  }
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

.save-btn,
.export-btn {
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
