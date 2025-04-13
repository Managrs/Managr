<template>
  <section>
  <header class="header">
    <nav class="navigation">
      <router-link to="/" class="logo-link" aria-label="Home">
        <img src="/brandlogo.png" alt="Logo" class="logo-image" width="120" height="40">
      </router-link>
      
      <ul class="nav-links">
        <li>
          <router-link to="/dashboard" class="nav-link">Login</router-link>
        </li>
        <li>
          <router-link to="/dashboard" class="nav-link">Signup</router-link>
        </li>
      </ul>
    </nav>
  </header>

    <section class="landing-content">
      <section>
        <video autoplay muted loop class="display-video">
          <source src="/display.mp4" type="video/mp4" />
        </video>
        <h1 class="main-title">Welcome to Managr!</h1>
        <p class="main-subtitle">Your platform for freelancers and clients to connect seamlessly.</p>
        <router-link to="/dashboard" class="cta-button">Get Started</router-link>
    </section>
    </section>
  </section>
</template>
  
<script lang="ts">
  export default {
    name: "LandingPage"
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

  .landing-content {
  margin-top: 100px;
  color: #000000;
  text-align: center;
  }
</style>
  