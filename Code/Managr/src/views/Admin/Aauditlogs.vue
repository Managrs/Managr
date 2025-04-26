<template>
    <main>
      <header class="user-head">
        <h1>Audit Logs</h1>
      </header>
  
      <section class="filter-by">Filter</section>
  
      <table class="approval-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Entity ID</th>
            <th>Action</th>
            <th>User Role</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in auditLogs" :key="log.timestamp + log.entityId">
            <td>{{ log.username }}</td>
            <td>{{ log.entityId }}</td>
            <td>{{ log.action }}</td>
            <td>{{ log.role }}</td>
            <td>{{ log.timestamp }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </template>
  
  <script>
  export default {
    name: "Aauditlogs",
    data() {
      return {
        auditLogs: [
          {
            username: "Olivia Rhye",
            entityId: "USR7890",
            action: "Created new user",
            role: "Admin",
            timestamp: "2025-04-23 14:12"
          },
          {
            username: "Phoenix Baker",
            entityId: "ORD1234",
            action: "Updated order status",
            role: "Manager",
            timestamp: "2025-04-23 13:45"
          },
          {
            username: "Lana Steiner",
            entityId: "PRD4567",
            action: "Deleted product",
            role: "Admin",
            timestamp: "2025-04-22 17:33"
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .user-head {
    padding: 16px;
    font-size: 24px;
    font-weight: bold;
  }
  
  .filter-by {
    margin: 12px 0;
    font-weight: 500;
    color: #4b5563;
  }
  
  .approval-table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    overflow: hidden;
  }
  
  .approval-table th,
  .approval-table td {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .approval-table thead {
    background-color: #f9fafb;
    color: #374151;
  }
  
  .approval-table tbody tr:hover {
    background-color: #f3f4f6;
  }
  </style>
  