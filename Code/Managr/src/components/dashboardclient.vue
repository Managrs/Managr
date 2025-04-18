<template>
  <section class="dashboard">
    <header>
      <section class="logo">
        <img :src="logo" alt="Managr Logo" />
      </section>
      <nav>
        <button class="post-btn">Post Project</button>
        <button id="messages-btn">Messages</button>
        <!-- <button onclick ="location.href='https://wa.me/+27814903174/?text=Conntect me on whatsapp'">Message</button>-->
        <section class="profile-picture">
          <img :src="profilePic" alt="Profile Picture" />
        </section>
      </nav>
    </header>

    <main>
      <section class="search-container">
        <h2>Find Trusted Freelancers for Your Everyday Needs</h2>
        <input
          type="text"
          class="search-bar"
          placeholder="What can I help you with"
        />
      </section>

      <section class="freelancer-section">
        <h3>Available Freelancers</h3>
        <ul class="freelancer-scroll">
          <li class="category-box">Web Design</li>
          <li class="category-box">Graphic Design</li>
          <li class="category-box">Photography</li>
          <li class="category-box">Plumbing</li>
          <li class="category-box">Writing</li>
          <li class="category-box">SEO</li>
          <li class="category-box">Video Editing</li>
          <li class="category-box">Marketing</li>
          <li class="category-box">Translation</li>
          <li class="category-box">Consulting</li>
        </ul>
      </section>
    </main>
  </section>
</template>

<script setup>
import logo from '../assets/logo1.jpg'
import profilePic from '../assets/noprofile.jpg'

console.log("Dashboard ready");

document.getElementById("message-btn").onclick = function(){

}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard {
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

.post-btn,
.messages-btn {
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
  align-items: center;
  padding: 2rem;
}

.search-container {
  text-align: center;
  margin-bottom: 3rem;
}

.search-container h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.search-bar {
  padding: 0.9rem 1.5rem;
  width: 100%;
  max-width: 700px;
  border: 2px solid #000;
  font-size: 1rem;
  border-radius: 50px;
}

.freelancer-section {
  width: 100%;
  max-width: 1000px;
  margin-top: 2rem;
  text-align: center;
}

.freelancer-section h3 {
  margin-bottom: 1rem;
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
</style>
