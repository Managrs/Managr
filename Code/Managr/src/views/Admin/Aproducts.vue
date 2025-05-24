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
    const searchQuery = ref('');
    const statusFilter = ref('');

    const fetchStatuses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/statuses`);
        statuses.value = response.data;
      } catch (error) {
        console.error('Error fetching statuses:', error);
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredStatuses = computed(() => {
      return statuses.value.filter(status => {
        const matchesSearch = 
          status.clientEmail.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          status.freelancerEmail.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          status.gigName.toLowerCase().includes(searchQuery.value.toLowerCase());
        
        const matchesStatus = statusFilter.value ? 
          status.status === statusFilter.value : true;
        
        return matchesSearch && matchesStatus;
      });
    });

    onMounted(fetchStatuses);

    return {
      statuses,
      loading,
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