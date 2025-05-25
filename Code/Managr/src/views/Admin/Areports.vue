<template>
  <main class="report-management">
    <header class="header-section">
      <h1>Report Management</h1>
      <form class="filter-form" @submit.prevent="fetchReports">
        <fieldset class="filter-group">
          <legend class="visually-hidden">Report filters</legend>
          
          <section class="filter-row">
            <article class="filter-control">
              <label for="status">Status</label>
              <select id="status" v-model="filters.status">
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="resolved">Resolved</option>
              </select>
            </article>

            <article class="filter-control">
              <label for="category">Category</label>
              <select id="category" v-model="filters.category">
                <option value="">All</option>
                <option value="payment">Payment</option>
                <option value="behavior">Behavior</option>
                <option value="technical">Technical</option>
              </select>
            </article>

            <button type="submit" class="apply-btn">Apply</button>
          </section>
        </fieldset>
      </form>
    </header>

    <section class="reports-section" aria-labelledby="reports-heading">
      <h2 id="reports-heading" class="visually-hidden">User-submitted reports</h2>
      <table class="reports-table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Client</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report._id">
            <td>{{ report.reportTitle }}</td>
            <td>{{ report.clientName }}</td>
            <td>{{ report.category }}</td>
            <td>
              <select v-model="report.status" @change="updateReport(report)">
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="resolved">Resolved</option>
              </select>
            </td>
            <td>
              <button @click="openDetails(report)">Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <dialog v-if="selectedReport" ref="modal">
      <h3>{{ selectedReport.reportTitle }}</h3>
      <p><strong>Client:</strong> {{ selectedReport.clientName }}</p>
      <p><strong>Submitted:</strong> {{ formatDate(selectedReport.createdAt) }}</p>
      
      <article>
        <h4>Description</h4>
        <p>{{ selectedReport.reportDescription }}</p>
      </article>

      <section v-if="selectedReport.adminComments.length">
        <h4>Admin Notes</h4>
        <ul>
          <li v-for="note in selectedReport.adminComments" :key="note._id">
            <p>{{ note.comment }}</p>
            <small>{{ formatDate(note.createdAt) }}</small>
          </li>
        </ul>
      </section>

      <form @submit.prevent="addComment">
        <label for="comment">Add Note</label>
        <textarea id="comment" v-model="newComment"></textarea>
        <button type="submit" class="apply-btn">Save Note</button>
      </form>

      <button @click="closeModal" class="close-btn">Close</button>
    </dialog>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const reports = ref([]);
const selectedReport = ref(null);
const newComment = ref('');
const modal = ref(null);
const filters = ref({
  status: '',
  category: ''
});

const fetchReports = async () => {
  try {
    const params = new URLSearchParams(filters.value);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/reports}`);
    reports.value = await response.json();
  } catch (err) {
    console.error('Failed to fetch reports:', err);
  }
};

const updateReport = async (report) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/admin/reports/${report._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: report.status })
    });
  } catch (err) {
    console.error('Failed to update report:', err);
  }
};

const openDetails = (report) => {
  selectedReport.value = report;
  modal.value.showModal();
};

const addComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    await fetch(`${import.meta.env.VITE_API_URL}/admin/reports/${selectedReport.value._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        comment: newComment.value 
      })
    });
    newComment.value = '';
    fetchReports();
  } catch (err) {
    console.error('Failed to add comment:', err);
  }
};

const closeModal = () => {
  modal.value.close();
  selectedReport.value = null;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(fetchReports);
</script>

<style scoped>
.report-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header-section {
  margin-bottom: 24px;
}

.header-section h1 {
  margin-bottom: 16px;
  color: #1a237e;
  font-size: 24px;
}

.filter-form {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.filter-group {
  border: none;
  padding: 0;
  margin: 0;
}

.filter-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.filter-control {
  flex: 1;
  min-width: 200px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #424242;
}

select, textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  background-color: white;
}

.apply-btn {
  padding: 8px 24px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 36px;
}

.apply-btn:hover {
  background-color: #4338ca;
}

.close-btn {
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 12px;
}

.reports-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.reports-table th {
  background-color: #f5f5f5;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
}

.reports-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

dialog {
  width: 90%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

dialog h3 {
  margin-top: 0;
  margin-bottom: 16px;
}

dialog article {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin: 15px 0;
}

dialog ul {
  padding-left: 20px;
  list-style-type: none;
}

dialog li {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ddd;
}

dialog small {
  color: #666;
  font-size: 12px;
  display: block;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .filter-control {
    width: 100%;
  }
  
  .apply-btn {
    width: 100%;
  }
}
</style>