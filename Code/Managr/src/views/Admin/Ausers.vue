<template>
  <section class="user-management">
    <header class="controls">
      <h1>User Management</h1>
      <form @submit.prevent="applyFilters" class="filters">
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search users..."
          aria-label="Search users"
        />
        <select v-model="roleFilter" aria-label="Filter by role">
          <option value="">All Roles</option>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>
        <button type="submit">Apply</button>
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
              <span class="user-name">{{ user.name }}</span>
            </td>
            <td class="email">{{ user.email }}</td>
            <td class="role">{{ user.role }}</td>
            <td class="action-cell">
              <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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

<script setup>
import { ref, computed, onMounted } from 'vue';

const API_URL = import.meta.env.VITE_API_URL;
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
      search: searchQuery.value
    });
    const response = await fetch(`${API_URL}/users?${params}`);
    users.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = !roleFilter.value || user.role === roleFilter.value;
    return matchesSearch && matchesRole;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / perPage.value);
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredUsers.value.slice(start, end);
});

const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    await fetchUsers();
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(fetchUsers);
</script>

<style scoped lang="scss">
.user-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, sans-serif;

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .filters {
      display: flex;
      gap: 12px;

      input, select {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      button {
        padding: 8px 16px;
        background-color: #4f46e5;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #4338ca;
        }
      }
    }
  }

  .container {
    margin-bottom: 24px;
  }

  .user-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    overflow: hidden;

    thead {
      background-color: #f9fafb;
      text-align: left;
    }

    th, td {
      padding: 14px 16px;
      border-bottom: 1px solid #eee;
      vertical-align: middle;
    }

    tbody tr:hover {
      background-color: #f5f5f5;
    }

    .name-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-name {
      font-weight: bold;
      color: #111827;
    }

    .email {
      color: #6b7280;
    }

    .role {
      color: #374151;
      text-transform: capitalize;
    }

    .action-cell {
      button.delete-btn {
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
        background-color: #fee2e2;
        color: #dc2626;
        border: 1px solid #fca5a5;

        &:hover {
          background-color: #fecaca;
        }
      }
    }
  }

  .pagination {
    display: flex;
    gap: 0.5rem;
    justify-content: center;

    button {
      padding: 8px 12px;
      border: 1px solid #ddd;
      background-color: white;
      cursor: pointer;
      border-radius: 4px;

      &:hover:not(:disabled) {
        background-color: #f3f4f6;
      }

      &:disabled {
        background-color: #4f46e5;
        color: white;
        cursor: default;
      }
    }
  }
}
</style>