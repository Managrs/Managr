<template>
  <section class="container">
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
        <tr v-for="user in users" :key="user.id">
          <td class="name-cell">
            <img :src="user.avatar" alt="Avatar" class="avatar" />
            <span class="user-name">{{ user.fullName }}</span>
          </td>
          <td class="email">{{ user.email }}</td>
          <td class="role">{{ user.role }}</td>
          <td class="action-cell">
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);

// Fetch users when the component is mounted
const fetchUsers = async () => {
  try {
    const backendUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${backendUrl}/allusers`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();  // Parse the JSON response
    users.value = data;  // Assign the fetched data to your users ref
  } catch (err) {
    console.error('Error fetching users:', err);
  }
};

// Delete user functionality
const deleteUser = async (id) => {
  try {
    const backendUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${backendUrl}/deleteUser/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    const result = await response.json();
    console.log('User deleted:', result.message);
    fetchUsers();  // Re-fetch the users after deleting
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

// Fetch users on component mount
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

.user-table th,
.user-table td {
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
.role {
  color: #374151;
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
