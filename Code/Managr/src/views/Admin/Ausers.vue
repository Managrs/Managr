<template>
    <section class="user-management">
        <header class="controls">
            <h1> User Management</h1>
            <!-- v-model: connects your form input (what the user sees and types) directly to a Vue.js data property 
             It binds the input field two ways:
                When theuser types, Vue updates the JavaScript variable.
                When thevariable changes in the code, Vue updates the field.
            
            -->
            <form @submit.prevent="applyFilters" class="filters">
                <input
                type="search"
                v-model="searchQuery"
                placeholder="Search users..."
                aria-label="Search users"
                />
                <select v-model="roleFilter" aria-label="Filter by role">
                    <option value="">
                        All Roles
                    </option>

                    <option value="freelancer">
                        Freelancer
                    </option>
                    
                    <option value="cient">
                        Client
                    </option>
                </select>
                <button type="submit">Apply </button>
            </form>
        </header>

        <section class="stats">
            <article v-for="stat in stats" :key="stat.title">
                <h2>{{ stat.title }}</h2>
                <p>{{ stat.value }}</p>
            </article>
        </section>

        <table>
            <thead>
                <tr>
                <th><input type="checkbox" v-model="selectAll" /></th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>
        
            <tbody>
                <tr v-for="user in paginatedUsers" :key="user.id">
                    <td><input type="checkbox" v-model="selectedUsers" :value="user.id" /></td>
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td :class="`role-${user.role}`">{{ user.role }}</td>
                    <td :class="`status-${user.verificationStatus}`">
                        {{ user.verificationStatus }}
                    </td>
                    <td>
                        <button @click="editUser(user)">Edit</button>
                        <button @click="suspendUser(user.id)">Suspend</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="pagination">
            <button 
                v-for="page in totalPages" 
                :key="page" 
                @click="currentPage = page"
                :disabled="currentPage === page"
            >
        {{ page }}
      </button>
    </nav>


    </section>

</template>

<style scoped lang="scss">
.user-management{
    max-width:1200px;
    margin: 0 auto;

    .controls{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .stats{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;

        article{
            border: 1px solid #eee;
            padding: 1rem;
        }
    }

    table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .role-admin { background: #f0f0f0; }
    .status-pending { color: orange; }
  }
  .pagination{
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }



}

</style>

<script setup>
import { ref, computed, onMounted } from 'vue';
const API_URL = import.meta.env.VITE_API_URL;
//console.log("API Base:", import.meta.env.VITE_API_URL);

const selectAll = ref(false);
const selectedUsers = ref([]);
const statusFilter = ref('');

const totalPages = computed(() =>{
  return Math.ceil(filteredUsers.value.length / perPage.value);
});
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredUsers.value.slice(start, end);
});

const stats = ref([
  { title: 'Total Users', value: 0 },
  { title: 'Active Users', value: 0 },
  { title: 'Suspended Users', value: 0 }
]);




const users = ref([]); 
const searchQuery = ref('');
const roleFilter = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const isLoading = ref(false);
const error = ref(null);

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const params = new URLSearchParams({
      role: roleFilter.value,
      status: statusFilter.value,
      search: searchQuery.value
    });
    const response = await fetch(`${API_URL}/users?${params}`);
    users.value = await response.json();

    stats.value = [
    { title: 'Total Users', value: users.value.length },
    { title: 'Active Users', value: users.value.filter(u => u.verificationStatus === 'active').length },
    { title: 'Suspended Users', value: users.value.filter(u => u.verificationStatus === 'suspended').length }
    ];
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};


onMounted(fetchUsers);


const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = !roleFilter.value || user.role === roleFilter.value;
    return matchesSearch && matchesRole;
  });
});


const suspendUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users?${params}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'suspended' })
    });
    if (!response.ok) throw new Error('Failed to update user');
    await fetchUsers(); // Refresh the list
  } catch (err) {
    error.value = err.message;
  }
};

const editUser = async (userData) => {
  // Similar API call for editing
};
</script>