<template>
  <article class="report-container">
    <header>
      <h2>User Reports Management</h2>
      <form @submit.prevent="fetchReports" class="filter-controls">
        <fieldset>
          <legend>Filter Reports</legend>
          <label for="status-filter">Status</label>
          <select id="status-filter" v-model="filters.status">
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="resolved">Resolved</option>
          </select>

          <label for="category-filter">Category</label>
          <select id="category-filter" v-model="filters.category">
            <option value="">All</option>
            <option value="payment">Payment</option>
            <option value="behavior">Behavior</option>
            <option value="technical">Technical</option>
          </select>

          <button type="submit">Apply Filters</button>
        </fieldset>
      </form>
    </header>

    <section aria-labelledby="reports-list-heading">
      <h3 id="reports-list-heading">Current Reports ({{ filteredReports.length }})</h3>
      
      <ul class="report-list">
        <li v-for="report in reports" :key="report._id" class="report-item">
          <details>
            <summary>
              <strong>{{ report.reportTitle }}</strong>
              <small>Reported by {{ report.clientName }} on {{ new Date(report.createdAt).toLocaleDateString() }}</small>
              <mark :class="`status-${report.status}`">{{ report.status }}</mark>
            </summary>
            
            <section class="report-details">
              <p>{{ report.reportDescription }}</p>
              
              <article v-if="report.adminComments.length > 0" class="admin-comments">
                <h4>Admin Notes</h4>
                <ul>
                  <li v-for="(note, index) in report.adminComments" :key="index">
                    <p>{{ note.comment }}</p>
                    <small>Added on {{ new Date(note.createdAt).toLocaleString() }}</small>
                  </li>
                </ul>
              </article>

              <form @submit.prevent="updateReport(report._id)" class="report-actions">
                <label :for="`status-${report._id}`">Update Status</label>
                <select :id="`status-${report._id}`" v-model="report.newStatus">
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="resolved">Resolved</option>
                </select>

                <label :for="`comment-${report._id}`">Add Note</label>
                <textarea :id="`comment-${report._id}`" v-model="report.newComment"></textarea>

                <button type="submit">Save Changes</button>
              </form>
            </section>
          </details>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
        export default {
        name: "Areports"
    }
</script>

<styles>
.report-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.filter-controls fieldset {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  margin-bottom: 1rem;
}

.report-list {
  list-style: none;
  padding: 0;
}

.report-item {
  border: 1px solid #eee;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.report-item details {
  padding: 1rem;
}

.report-item summary {
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
}

.report-item mark {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-transform: capitalize;
}

.status-pending {
  background-color: #fff3e0;
  color: #e65100;
}

.status-reviewing {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-resolved {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.admin-comments {
  background-color: #f5f5f5;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.report-actions {
  margin-top: 1rem;
  border-top: 1px dashed #ccc;
  padding-top: 1rem;
}

.report-actions textarea {
  width: 100%;
  min-height: 80px;
  margin: 0.5rem 0;
}
</styles>