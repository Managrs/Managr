<template>
  <section class="admin-statuses">
    <h2>Client-Freelancer Application Statuses</h2>
    
    <section class="controls">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search by client or freelancer email" 
        class="search-input"
      >
      
      <select v-model="statusFilter" class="status-filter">
        <option value="">All Statuses</option>
        <option value="Approved">Approved</option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
      </select>
    </section>

    <table v-if="!loading" class="statuses-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Freelancer</th>
          <th>Gig</th>
          <th>Category</th>
          <th>Budget</th>
          <th>Status</th>
          <th>Application Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="status in filteredStatuses" :key="status._id">
          <td>{{ status.clientEmail }}<br><small>{{ status.clientName }}</small></td>
          <td>{{ status.freelancerEmail }}</td>
          <td>{{ status.gigName }}</td>
          <td>{{ status.category }}</td>
          <td>R{{ status.budget }}</td>
          <td :class="`status-${status.status.toLowerCase()}`">
            {{ status.status }}
          </td>
          <td>{{ formatDate(status.applicationDate) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="loading">Loading statuses...</p>
    <p v-if="!loading && statuses.length === 0">No application statuses found</p>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const statuses = ref([]);
    const loading = ref(true);
    const error = ref(null); // Added an error ref for user feedback
    const searchQuery = ref('');
    const statusFilter = ref('');

    const fetchStatuses = async () => {
      try {
        loading.value = true;
        error.value = null; // Clear previous errors
        const apiUrl = `${import.meta.env.VITE_API_URL}/admin/statuses`;


        const response = await axios.get(apiUrl);

        if (Array.isArray(response.data)) {
          statuses.value = response.data;
        } else {
          console.error('Error: API response is not an array.', response.data);
          statuses.value = []; // Default to an empty array to prevent further errors
          error.value = 'Received unexpected data format from server.';
        }
      } catch (err) {
        console.error('Error fetching statuses:', err);
        statuses.value = []; // Default to an empty array on error
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          error.value = `Error ${err.response.status}: ${err.response.data?.message || err.message}`;
        } else if (err.request) {
          // The request was made but no response was received
          error.value = 'Network error: Could not connect to the server.';
        } else {
          // Something happened in setting up the request that triggered an Error
          error.value = `Error: ${err.message}`;
        }
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return 'Invalid Date';
      }
    };

    const filteredStatuses = computed(() => {
      if (!Array.isArray(statuses.value)) return [];

      const query = searchQuery.value.toLowerCase().trim();
      const status = statusFilter.value;

      return statuses.value.filter(app => {
        // Check status filter
        if (status && app.status !== status) return false;
        
        // Check search query
        if (!query) return true;
        
        return (
          (app.clientEmail?.toLowerCase().includes(query)) ||
          (app.clientName?.toLowerCase().includes(query)) ||
          (app.freelancerEmail?.toLowerCase().includes(query)) ||
          (app.freelancerName?.toLowerCase().includes(query)) ||
          (app.gigName?.toLowerCase().includes(query))
        );
      });
    });

    onMounted(fetchStatuses);

    return {
      statuses,
      loading,
      error, // Expose error ref
      searchQuery,
      statusFilter,
      filteredStatuses,
      formatDate
    };
  }
};
</script>

<style scoped>
.admin-statuses {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.search-input, .status-filter {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.statuses-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.statuses-table th,
.statuses-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.statuses-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.status-approved {
  color: #28a745;
  font-weight: 500;
}

.status-pending {
  color: #ffc107;
  font-weight: 500;
}

.status-rejected {
  color: #dc3545;
  font-weight: 500;
}

small {
  color: #666;
  font-size: 0.85em;
}
</style>