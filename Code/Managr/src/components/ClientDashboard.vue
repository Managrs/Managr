<template>
    <main class="dashboard">
      <!-- HEADER -->
      <header class="header">
        <nav class="navigation">
          <a href="#" class="logo-link" aria-label="Managr - Home">
            <img 
              src="/brandlogo.png" 
              alt="Managr" 
              class="logo-image"
              width="120" 
              height="40"
            >
          </a>
  
          <section class="user-section">
            <ul class="nav-links">
              <li><router-link to="/managegig" class="nav-link">Manage Gigs</router-link></li>
              <li><router-link to="/postgig" class="nav-link">Post Gig</router-link></li>
              <li><router-link to="/messages" class="nav-link">Message us</router-link></li>
            </ul>
            <figure class="user-avatar">
              <a href="#">
                <img src="https://static.codia.ai/custom_image/2025-04-10/182941/user-avatar.png" alt="User Avatar" class="avatar-image" />
              </a>
            </figure>
          </section>
        </nav>
      </header>
  
      <!-- SEARCH AREA -->
      <section class="search-container">
        <h2>Find Trusted Freelancers for Your Everyday Needs</h2>
        <input type="text" class="search-bar" placeholder="What can I help you with" v-model="searchTitle" />
        <section class="price-inputs">
          <input type="number" placeholder="Min Price (R)" v-model="minPrice" />
          <input type="number" placeholder="Max Price (R)" v-model="maxPrice" />
        </section>
        <button id="search-btn" @click="search">Search</button>
      </section>
  
      <!-- RESULTS -->
      <section class="freelancer-results" v-if="showResults">
        <h4>Freelancer Results</h4>
        <section id="results-container">
          <template v-if="freelancers.length">
            <article v-for="(f, index) in freelancers" :key="index" class="freelancer-profile">
              <header class="profile-header">
                <img src="/assets/noprofile.jpg" alt="Profile Picture" class="profile-pic" />
                <h4>{{ f.name }}</h4>
              </header>
              <section class="profile-info">
                <p>Title: {{ f.title }}</p>
                <p>Price: {{ f.price }}</p>
                <p>Skills: {{ f.skills.join(', ') }}</p>
              </section>
            </article>
          </template>
          <p v-else>No freelancers found in that price range.</p>
        </section>
      </section>
  
      <!-- CATEGORIES -->
      <section class="freelancer-section">
        <h3>Freelancer Categories</h3>
        <section class="freelancer-scroll">
          <article class="category-box" v-for="(category, i) in categories" :key="i">
            {{ category }}
          </article>
        </section>
      </section>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const searchTitle = ref('')
  const minPrice = ref('')
  const maxPrice = ref('')
  const freelancers = ref([])
  const showResults = ref(false)
  
  const categories = [
    'Web Design', 'Graphic Design', 'Writing', 'Marketing',
    'Software Development', 'Mobile App Development', 'SEO',
    'Data Science', 'Video Editing', 'Translation',
    'Virtual Assistance', 'Music Production'
  ]
  
  const search = async () => {
    try {
      const url = `http://localhost:3000/results?title=${encodeURIComponent(searchTitle.value)}&minPrice=${minPrice.value}&maxPrice=${maxPrice.value}`
      const res = await fetch(url)
      const data = await res.json()
      freelancers.value = data.freelancers
      showResults.value = true
    } catch (err) {
      console.error('Search failed:', err)
    }
  }
  </script>
  
  <style scoped>
  /* Header Styles */
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 80px;
    padding: 0 30px;
    background: #ffffff;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 1.5rem;
    z-index: 10;
  }
  
  .logo-link {
    text-decoration: none;
  }
  
  .user-section {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
  }
  
  .nav-links {
    display: flex;
    gap: 12px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    display: inline-block;
    padding: 8px 18px;
    border: 1px solid black;
    border-radius: 6px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    color: #ffffff;
    background: #000000;
    white-space: nowrap;
  }
  
  .nav-link:hover {
    background: #e77e23;
    color: #ffffff;
  }
  
  .user-avatar {
    width: 35px;
    height: 35px;
    background: #f3f3f3;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Layout Styles */
  .dashboard {
    padding-top: 90px;
    background: linear-gradient(45deg, #e77e23, #2b3d4f);
    min-height: 100vh;
    color: #000;
  }
  
  .search-container {
    text-align: center;
    margin: 2rem auto;
    max-width: 800px;
  }
  
  .search-bar {
    padding: 0.9rem 1.5rem;
    width: 100%;
    max-width: 700px;
    border: 2px solid #000;
    font-size: 1rem;
    border-radius: 50px;
  }
  
  .price-inputs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .price-inputs input {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    border: 2px solid #000;
    border-radius: 25px;
    width: 150px;
  }
  
  #search-btn {
    background-color: #000;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }
  
  #search-btn:hover {
    background-color: #333;
  }
  
  .freelancer-results {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 2rem;
  }
  
  .freelancer-profile {
    background: #f4f4f4;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .profile-info p {
    margin: 0.25rem 0;
  }
  
  .freelancer-section {
    width: 100%;
    max-width: 1000px;
    margin: 2rem auto;
  }
  
  .freelancer-scroll {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
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
  </style>
  