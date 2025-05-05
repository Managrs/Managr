<template>
    <nav>
      <router-link to="/dashboardfreelance">
        <button type="button" class="secondary-btn">Back to Dashboard</button>
      </router-link>
    </nav>
  
    <section class="post-page">
      <h2 class="page-title">Apply for a Gig</h2>
      <form @submit.prevent="submitGig">
        <label for="clientEmail">Client Email</label><br>
        <input type="text" id="clientEmail" v-model="gig.clientEmail" required readonly><br>
  
        <label for="freelancerEmail">Freelancer Email</label><br>
        <input type="text" id="freelancerEmail" v-model="gig.freelancerEmail" required readonly><br>
  
        <label for="gigDescription">Gig Description</label><br>
        <textarea
          id="gigDescription"
          v-model="gig.gigDescription"
          required
          rows="5"
          placeholder="Write your application message here"
        ></textarea><br>
  
        <button type="submit">Apply for Gig</button>
      </form>
    </section>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    name: "ApplyGig",
    data() {
      return {
        gig: {
          clientEmail: "",
          freelancerEmail: "",
          gigDescription: "",
        },
      };
    },
    mounted() {
      const userStore = useUserStore();
      const prefillClientEmail = this.$route.query.clientEmail;
      if (prefillClientEmail) {
        this.gig.clientEmail = prefillClientEmail;
      }
  
      this.gig.freelancerEmail = userStore.email;
    },
    methods: {
      async submitGig() {
        try {
          const backendUrl = import.meta.env.VITE_API_URL;
  
          const messagePayload = {
            senderId: this.gig.freelancerEmail,
            receiverId: this.gig.clientEmail,
            content: this.gig.gigDescription,
          };
  
          const response = await fetch(`${backendUrl}/application`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(messagePayload),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to submit application");
          }
  
          const data = await response.json();
          console.log("Application sent successfully:", data);
          alert("Application sent successfully!");
  
          this.gig.gigDescription = "";
  
        } catch (error) {
          console.error("Error submitting gig application:", error);
          alert("An error occurred while sending your application.");
        }
      },
    },
  };
  </script>  
  
  <style scoped>
  .post-page {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
  }
  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  button {
    color: #ffffff;
    background: #000000;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  button:hover {
    background: #e77e23;
    color: #ffffff;
  }
  .secondary-btn {
    color: #ffffff;
    background: #000000;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .secondary-btn:hover {
    background: #e77e23;
    color: #ffffff;
  }
  </style>
  