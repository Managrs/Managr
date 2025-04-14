<template>
    <div class="admin-dashboard">
      <header>
        <section class="logo">
          <img src="../assets/managr_logo.jpg" alt="Admin Logo" />
        </section>
        <nav>
          <button class="post-btn">View Projects</button>
          <button class="messages-btn">Reports</button>
          <section class="profile-picture">
            <img src="../assets/profile.jpg" alt="Admin Profile Picture" />
          </section>
        </nav>
      </header>
  
      <main>
        <section class="search-container">
          <h2>Welcome, Admin! Here's your platform overview</h2>
        </section>
  
        <section class="freelancer-section">
          <h3>Dashboard Summary</h3>
          <ul class="freelancer-scroll">
            <li class="category-box">Freelancers: {{ freelancers.length }}</li>
            <li class="category-box">Projects: {{ totalProjects }}</li>
            <li class="category-box">Pending Payments: R{{ pendingPayments }}</li>
          </ul>
        </section>
  
        <section class="freelancer-section" style="margin-top: 8rem;">
          <h3>Freelancer Activity</h3>
          <ul class="freelancer-list">
            <li v-if="freelancers.length === 0">No freelancer data available.</li>
          </ul>
        </section>
  
        <section class="freelancer-section" style="margin-top: 4rem;">
          <h3>Pending Approvals</h3>
          <table class="approval-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in pendingUsers" :key="user.name">
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <button class="approve-btn" @click="approve(user.name)">Approve</button>
                  <button class="reject-btn" @click="reject(user.name)">Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface User {
    name: string;
    role: 'Freelancer' | 'Client' | 'Admin';
  }
  
  export default defineComponent({
    name: 'AdminDashboard',
    data() {
      return {
        freelancers: [] as User[],
        totalProjects: 0,
        pendingPayments: 0,
        pendingUsers: [
          { name: "Kagiso", role: "Freelancer" },
          { name: "Kgaugelo", role: "Client" },
          { name: "Lebo", role: "Freelancer" }
        ] as User[]
      };
    },
    mounted() {
      console.log("Admin Dashboard ready");
    },
    methods: {
      approve(name: string) {
        alert(`${name} has been approved.`);
        // Add your approval logic here
      },
      reject(name: string) {
        alert(`${name} has been rejected.`);
        // Add your rejection logic here
      }
    }
  });
  </script>
  
  <style scoped>
  /* Copy all the CSS from style.css here */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, Calibri, sans-serif;
    background-color: #ffffff;
    color: #000000;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;
    color: #000;
  }
  
  .logo img {
    height: 1.5rem;
  }
  
  nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .post-btn, .messages-btn {
    background: #fff;
    color: #000;
    border: 2px solid #000;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
  }
  
  .profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .profile-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: relative;
  }
  
  .search-container {
    text-align: center;
    margin-bottom: 3rem;
    margin-top: -4rem;
  }
  
  .search-container h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .freelancer-section {
    width: 100%;
    max-width: 1000px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .freelancer-section h3 {
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1rem;
  }
  
  .freelancer-scroll {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scroll-behavior: smooth;
  }
  
  .category-box {
    min-width: 100px;
    height: 100px;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: bold;
    border-radius: 0.5rem;
    flex-shrink: 0;
  }
  
  .freelancer-list {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }
  
  .freelancer-list li {
    background-color: #f2f2f2;
    margin-bottom: 0.75rem;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-style: italic;
    color: #555555;
  }
  
  /* Pending approvals table */
  .approval-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .approval-table th,
  .approval-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  
  .approve-btn, .reject-btn {
    padding: 0.4rem 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    margin-right: 0.5rem;
    border-radius: 5px;
  }
  
  .approve-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .reject-btn {
    background-color: #f44336;
    color: white;
  }
  </style>