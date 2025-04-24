<template>
  <section class="container">
    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Last Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="name-cell">
            <img :src="user.avatar" alt="Avatar" class="avatar" />
            <span class="user-name">{{ user.name }}</span>
          </td>
          <td class="email">{{ user.email }}</td>
          <td class="role">{{ user.role }}</td>
          <td class="last-active">{{ user.lastActive }}</td>
          <td class="action-cell">
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  {
    id: 1,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    role: 'Admin',
    lastActive: 'Mar 14, 2022',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 2,
    name: 'Phoenix Baker',
    email: 'phoenix@untitledui.com',
    role: 'Editor',
    lastActive: 'Mar 12, 2022',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: 3,
    name: 'Lana Steiner',
    email: 'lana@untitledui.com',
    role: 'Viewer',
    lastActive: 'Mar 10, 2022',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  }
])

const deleteUser = (id) => {
  alert(`Deleting user with id: ${id}`)
}
</script>

<style scoped>
.container {
  padding: 24px;
  font-family: Arial, sans-serif;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}

.user-table thead {
  background-color: #f9fafb;
  text-align: left;
}

.user-table th,
.user-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.user-table tbody tr:hover {
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

.role,
.last-active {
  color: #374151;
}

.action-cell button {
  background-color: transparent;
  color: #dc2626;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.action-cell button:hover {
  text-decoration: underline;
}
</style>