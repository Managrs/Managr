<template>
  <header class="header">
    <nav class="navigation">
      <router-link to="/" class="logo-link" aria-label="Home">
        <img src="/brandlogo.png" alt="Logo" class="logo-image" width="120" height="40" />
      </router-link>

      <ul class="nav-links">
        <li>
          <button class="nav-link" @click="handleLogin">Sign in</button>
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="landing-content">
      <section class="hero-section">
        <img src="/display.jpg" alt="Dark sky background on landing page" />

        <section class="overlay-content">
          <h1 class="main-title">Welcome to Managr</h1>
          <p class="main-subtitle">Your platform for freelancers and clients to connect seamlessly.</p>
          <router-link to="/documentation" class="cta-button">Get Started with Managr</router-link>
        </section>
      </section>
    </section>
  </main>

  <footer class="footer">
    <p>&copy; 2025 Managr. All rights reserved.</p>
    <nav class="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Contact</a>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import router from '../router';

const handleLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
/* Global Reset */
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

/* Header & Navigation */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: white;
  height: 80px;
  padding: 0 30px;
  border-bottom: 1px solid var(--color-border);
}

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 80px;
  z-index: 100;
}

.logo-link {
  text-decoration: none;
}

.logo-image {
  height: auto;
  max-width: 100%;
}

/* Nav Button */
.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
}

.nav-link {
  padding: 8px 18px;
  border: 1px solid black;
  border-radius: 6px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: #000000;
  background: transparent;
  cursor: pointer;
}

.nav-link:hover {
  background: #000000;
  color: #ffffff;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.hero-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Overlay background for contrast */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

/* Overlay text */
.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
  padding: 1rem;
  width: 90%;
  max-width: 800px;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.main-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.cta-button {
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: black;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #ddd;
}

/* Footer */
.footer {
  padding: 2rem 1rem;
  background-color: #111;
  color: #fff;
  text-align: center;
  font-size: 0.9rem;
  width: 100%;
  box-sizing: border-box;
}

.footer-links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-links a {
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.2s ease-in-out;
}

.footer-links a:hover {
  border-bottom: 1px solid #fff;
}

/* Responsive Layout */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .main-subtitle {
    font-size: 1.2rem;
  }

  .cta-button {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  .nav-links {
    gap: 10px;
  }
}
</style>
