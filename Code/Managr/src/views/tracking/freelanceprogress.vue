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
        // Prepare data with fallbacks
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
      <html>
        <head>
          <title>${reportData.title} - Project Report</title>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Arial', sans-serif;
              padding: 2rem;
              color: #1a1a1a;
              background: #fff;
              max-width: 800px;
              margin: 0 auto;
              line-height: 1.6;
            }
            
            .header {
              text-align: center;
              margin-bottom: 2rem;
              padding-bottom: 1rem;
              border-bottom: 3px solid #2c3e50;
            }
            
            .header h1 {
              color: #2c3e50;
              font-size: 2rem;
              margin-bottom: 0.5rem;
            }
            
            .header .subtitle {
              color: #666;
              font-size: 1rem;
            }
            
            .section {
              margin: 2rem 0;
              padding: 1.5rem;
              border: 1px solid #dee2e6;
              border-radius: 8px;
              background: #f8f9fa;
            }
            
            .section h3 {
              color: #2c3e50;
              margin-bottom: 1rem;
              padding-bottom: 0.5rem;
              border-bottom: 1px solid #dee2e6;
            }
            
            .info-grid {
              display: grid;
              gap: 0.75rem;
            }
            
            .info-item {
              display: flex;
              justify-content: space-between;
              padding: 0.5rem 0;
              border-bottom: 1px dotted #ccc;
            }
            
            .info-item:last-child {
              border-bottom: none;
            }
            
            .info-label {
              font-weight: 600;
              color: #2c3e50;
            }
            
            .info-value {
              font-weight: 500;
            }
            
            .price {
              color: #2c3e50;
              font-weight: bold;
            }
            
            .paid-amount {
              color: #27ae60;
              font-weight: bold;
            }
            
            .remaining-amount {
              color: #e67e22;
              font-weight: bold;
            }
            
            .progress-section {
              background: #e8f4fd;
              border: 1px solid #2c3e50;
            }
            
            .progress-container {
              margin: 1rem 0;
            }
            
            .progress-bar-visual {
              width: 100%;
              height: 25px;
              background: #dee2e6;
              border-radius: 12px;
              overflow: hidden;
              margin: 0.5rem 0;
            }
            
            .progress-fill {
              height: 100%;
              background: linear-gradient(90deg, #e67e22, #f39c12);
              border-radius: 12px;
              width: ${reportData.progress}%;
              transition: width 0.3s ease;
            }
            
            .progress-text {
              text-align: center;
              font-weight: bold;
              color: #e67e22;
              font-size: 1.1rem;
              margin-top: 0.5rem;
            }
            
            .highlight {
              color: #e67e22;
              font-weight: bold;
            }
            
            .footer {
              margin-top: 3rem;
              text-align: center;
              color: #666;
              font-size: 0.9rem;
              border-top: 2px solid #2c3e50;
              padding-top: 1rem;
            }
            
            .generated-info {
              background: #f8f9fa;
              padding: 1rem;
              border-radius: 6px;
              margin-top: 1rem;
            }
            
            @media print {
              body { 
                padding: 1rem; 
                font-size: 12pt;
              }
              .section {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${reportData.title}</h1>
            <p class="subtitle">Project Status Report</p>
          </div>
          
          <div class="section">
            <h3>📋 Project Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Client:</span>
                <span class="info-value">${reportData.clientName}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Project ID:</span>
                <span class="info-value">${reportData.projectId}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Description:</span>
                <span class="info-value">${reportData.description}</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>💰 Financial Summary</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Total Project Value:</span>
                <span class="info-value price">$${reportData.totalPrice.toFixed(2)}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Amount Paid:</span>
                <span class="info-value paid-amount">$${reportData.paidAmount.toFixed(2)}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Amount Remaining:</span>
                <span class="info-value remaining-amount">$${reportData.amountDue.toFixed(2)}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Payment Progress:</span>
                <span class="info-value highlight">${((reportData.paidAmount / reportData.totalPrice) * 100).toFixed(1)}% Paid</span>
              </div>
            </div>
          </div>
          
          <div class="section progress-section">
            <h3>📈 Project Progress</h3>
            <div class="progress-container">
              <div class="progress-bar-visual">
                <div class="progress-fill"></div>
              </div>
              <div class="progress-text">${reportData.progress}% Complete</div>
              <div style="text-align: center; margin-top: 1rem;">
                <strong>Status:</strong> 
                <span class="highlight">
                  ${reportData.progress >= 90 ? 'Nearly Complete' :
            reportData.progress >= 70 ? 'Well Underway' :
              reportData.progress >= 40 ? 'In Progress' :
                reportData.progress >= 10 ? 'Getting Started' : 'Just Started'}
                </span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="generated-info">
              <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
              <p><strong>Generated by:</strong> Freelance Project Management System</p>
            </div>
          </div>
        </body>
      </html>
    `;

        // Create and open the print window
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        if (printWindow) {
          printWindow.document.write(html);
          printWindow.document.close();
          printWindow.focus();

          // Wait for content to load, then trigger print
          setTimeout(() => {
            printWindow.print();

            // Optional: Close window after printing (uncomment if desired)
            // printWindow.onafterprint = () => printWindow.close();
          }, 750);

        } else {
          // Handle popup blocker
          throw new Error('Popup blocked');
        }

      } catch (error) {
        console.error('PDF Export Error:', error);

        // Fallback alert with instructions
        alert(`Unable to export PDF. This might be due to popup blockers.    
            Please try:
            1. Allow popups for this site
            2. Use Ctrl+P (Cmd+P on Mac) to print this page
            3. Try again with popups enabled

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
