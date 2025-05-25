<template>
  <section class="user-management">
    <header class="controls">
      <h1> Products Management </h1>
    </header>

    <section class="container">
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Title</th>
            <th>Description</th>
            <th>Budget</th>
            <th>Due date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="name-cell">
              <img :src="user.image" alt="Avatar" class="avatar" />
              <article class="user-name">{{ user.name }}</article>
            </td>
            <td class="email">{{ user.mail }}</td>
            <td class="role">{{ user.title }}</td>
            <td class="role">{{ user.description }}</td>
            <td class="role">{{ user.budget }}</td>
            <td class="role">{{ user.time }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';

  const users = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchUsers = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/allgigs`);
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