<template>
    <header class="header">
      <nav class="navigation">
        <!-- Left Side - Logo -->
  
        <a href="https://www.fiverr.com/" class="logo-link" aria-label="Managr - Home">
          <img 
            src="/brandlogo.png" 
            alt="Managr" 
            class="logo-image"
            width="120" 
            height="40"
          >
        </a>
        
        <!-- Center - Search Container -->
        <section class="search-container">
          <input type="text" placeholder="Search for a gig" class="search-input" />
          <button class="search-icon" aria-label="Search"></button>
        </section>
  
        <!-- Right Side - Navigation Links -->
        <ul class="nav-links">
          <li>
            <router-link to="/Home" class="nav-link">Home</router-link>
          </li>
          <li>
            <router-link to="/todo" class="nav-link">To Do</router-link>
          </li>
          <li>
            <router-link to="/projects" class="nav-link">View Projects</router-link>
          </li>
          <li>
            <router-link to="/messages" class="nav-link">Messages</router-link>
          </li>
        </ul>
  
        <!-- User Section - Avatar and Dropdown -->
        <section class="user-section">
          <figure class="user-avatar">
            <a href="#">
              <img src="https://static.codia.ai/custom_image/2025-04-10/182941/user-avatar.png" alt="User Avatar" class="avatar-image" />
            </a>
          </figure>
        </section>
      </nav>
    </header>
    <section class="nav-divider"></section>
  </template>
  
  <script lang="ts">
  export default {
    name: "DashNavbar"
  }
  </script>
  
  <style scoped>
  /* Global Variables */

  
  /* Header Styling */
  .header {
    display: flex;
    justify-content: center; /* Centers the content */
    align-items: center;
    position: relative;
    height: 80px; /* Increased height for better spacing */
    padding: 0 30px; /* Increased padding */
    background: var(--color-white);
    border-bottom: 1px solid var(--color-border);
  }
  
  /* Navigation Container */
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: auto;
  }
  
  .nav-divider {
    height: 1px;
    background-color: #e0e0e0; /* Light gray - adjust as needed */
    margin: 0 16px; /* Optional side margins */
  }
  
  
  .logo-link {
    display: inline-block;
    text-decoration: none;
  }
  
  .logo-image {
    height: auto;
    max-width: 100%;
  }
  
  
  
  
  /* Left Side - Logo */
  .logo {
    font-size: 24px; /* Increased font size for better visibility */
    font-weight: 700;
    color: var(--color-dark-gray);
    text-decoration: none;
    flex-shrink: 0; /* Prevent shrinking */
  }
  
  /* Center - Search Container */
  .search-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 500px; /* Increased max width for search bar */
    height: 25px; /* Increased height */
    padding: 8px 18px;
    background: var(--color-white);
    border: none;
  }
  
  .search-icon {
    width: 30px;
    height: 30px;
    background: url('/searchIcon.png') no-repeat center;
    background-size: cover;
    margin-right: 12px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  
  .search-input {
    flex-grow: 1;
    font-size: 16px; /* Increased font size */
    color: var(--color-dark-gray);
    padding: 8px 18px;
    border: 1px solid #000000;
    border-radius: 6px;
    background: transparent;
  }
  
  .search-input::placeholder {
    color: #828282;
  }
  
  /* Right Side - Navigation Links */
  .nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
  }
  
  .nav-link {
    display: inline-block;
    padding: 8px 18px; /* Increased padding */
    border: 1px solid black;
    border-radius: 6px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 16px; /* Increased font size */
    font-weight: 500;
    text-decoration: none;
    color:  #000000;
    white-space: nowrap;
  }
  
  .nav-link:hover {
    background: #000000;
    color: #ffffff;
  }
  
  /* User Section - Avatar and Dropdown */
  .user-section {
    display: flex;
    align-items: center;
    gap: 12px; /* Increased gap between user avatar and icon */
  }
  
  .user-avatar {
    width: 35px;
    height: 35px;
    background: var(--color-light-gray);
    border-radius: 50%;
    overflow: hidden;
  }
  
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .dropdown-icon {
    width: 20px;
    height: 20px;
    background: url(https://static.codia.ai/custom_image/2025-04-10/182941/dropdown-arrow.svg) no-repeat center;
    background-size: cover;
    border: none;
    background-color: transparent;
  }
  </style>
  