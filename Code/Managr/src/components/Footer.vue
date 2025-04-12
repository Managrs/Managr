<template>
    <footer class="site-footer">
      <section class="footer-content">
        <section class="footer-section">
          <h3>About Us</h3>
          <p>Your company description goes here.</p>
        </section>
        
        <section class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li v-for="link in quickLinks" :key="link.text">
              <RouterLink :to="link.path">{{ link.text }}</RouterLink>
            </li>
          </ul>
        </section>
        
        <section class="footer-section">
          <h3>Contact</h3>
          <p>Email: {{ contactInfo.email }}</p>
          <p>Phone: {{ contactInfo.phone }}</p>
        </section>
      </section>
      
      <section class="footer-bottom">
        <p>&copy; {{ currentYear }} Your Company. All rights reserved.</p>
      </section>
    </footer>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';

    // Export the interfaces so they can be used elsewhere
    export interface FooterLink {
    text: string;
    path: string;
    }

    export interface ContactInfo {
    email: string;
    phone: string;
    }

    // Export the reactive data if needed
    export const currentYear = ref(new Date().getFullYear());

    export const quickLinks = ref<FooterLink[]>([
    { text: 'Home', path: '/' },
    { text: 'Services', path: '/services' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' }
    ]);

    export const contactInfo = ref<ContactInfo>({
    email: 'contact@example.com',
    phone: '+1 (123) 456-7890'
    });

    // Optional: Export the component name
    defineOptions({
    name: 'SiteFooter'
    });
    </script>

  <style scoped>
  .site-footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 2rem 0;
    font-family: 'Arial', sans-serif;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .footer-section {
    flex: 1;
    min-width: 200px;
    margin: 1rem;
  }
  
  .footer-section h3 {
    color: #f39c12;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .footer-section p, .footer-section ul {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-section a:hover {
    color: #f39c12;
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid #34495e;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
    }
    
    .footer-section {
      margin-bottom: 1.5rem;
    }
  }
  </style>