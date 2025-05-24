<template>
  <section class="user-management">
    <header class="controls">
      <h1>User Management</h1>
      <form @submit.prevent="applyFilters" class="filters">
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search by name or email..."
          aria-label="Search users"
        />
        <select v-model="roleFilter" aria-label="Filter by role">
          <option value="">All Roles</option>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" class="apply-btn">Apply Filters</button>
      </form>
    </header>

    <div class="container">
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td class="name-cell">
              <img :src="user.avatar || '/default-avatar.png'" alt="Avatar" class="avatar" />
              <span class="user-name">{{ user.fullName }}</span>
            </td>
            <td class="email">{{ user.email }}</td>
            <td class="role">{{ user.role }}</td>
            <td class="action-cell">
              <button @click="deleteUser(user.email)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav class="pagination" v-if="totalPages > 1">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        @click="currentPage = page"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
    </nav>
  </section>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/allusers`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      users.value = data;
    } catch (err) {
      error.value = err.message;
      console.error('Error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const filteredUsers = computed(() => {
    const searchTerm = searchQuery.value.toLowerCase();
    return users.value.filter(user => {
      const matchesSearch = 
        user.fullName?.toLowerCase().includes(searchTerm) || 
        user.email?.toLowerCase().includes(searchTerm);
      const matchesRole = !roleFilter.value || user.role?.toLowerCase() === roleFilter.value.toLowerCase();
      return matchesSearch && matchesRole;
    });
  });

  const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage.value));
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return filteredUsers.value.slice(start, start + perPage.value);
  });

  const deleteUser = async (userEmail) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }
      
      await fetchUsers(); // Refresh the list
    } catch (err) {
      error.value = err.message;
      console.error('Error:', err);
      alert(err.message); // Show error to user
    }
  };

  const applyFilters = () => {
    currentPage.value = 1;
  };

  onMounted(fetchUsers);
</script>

<style scoped>
  .apply-btn {
    padding: 8px 16px;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .apply-btn:hover {
    background-color: #4338ca;
  }

  .user-management {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .filters {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  input, select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .user-table th {
    background-color: #f8f9fa;
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
  }

  .user-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
  }

  .name-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name {
    font-weight: 500;
  }

  .email {
    color: #666;
  }

  .role {
    text-transform: capitalize;
    font-weight: 500;
  }

  .action-cell .delete-btn {
    background-color: #ffebee;
    color: #d32f2f;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .action-cell .delete-btn:hover {
    background-color: #ffcdd2;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 20px;
  }

  .pagination button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    border-radius: 4px;
  }

  .pagination button.active {
    background-color: #1976d2;
    color: white;
    border-color: #1976d2;
  }

  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .filters {
      width: 100%;
      flex-direction: column;
    }
    
    input, select {
      width: 100%;
    }
  }
</style>