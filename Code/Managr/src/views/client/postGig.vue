<template>
    <nav>
        <router-link to="/DashboardClient">
            <button type="button" class="secondary-btn">Back to Recent Gigs</button>
        </router-link>
    </nav>
    <section class="post-page">
      <h2 class="page-title">What Service Are You Looking For?</h2>
      <form @submit.prevent="submitGig">
        <label for="clientName">Client Name</label><br>
        <input type="text" id="clientName" v-model="gig.clientName" required><br>
  
        <label for="gigName">Gig Title</label><br>
        <input type="text" id="gigName" v-model="gig.gigName" required><br>
  
        <label for="gigDescription">Gig Description</label><br>
        <textarea
        id="gigDescription"
        v-model="gig.gigDescription"
        placeholder="Describe the service you are looking for"
        required
        rows="5"
        style="resize: vertical; width: 100%; padding: 0.5rem; margin-bottom: 1rem;"
        ></textarea><br>
  
        <label for="category">Category</label><br>
        <select v-model="gig.category" id="category" name="category">
        <option disabled value="">-- Please select a category --</option>
        <option>Logo Design</option>
        <option>Web Development</option>
        <option>Content Writing</option>
        <option>Marketing</option>
        <option>Mobile App Design</option>
        </select><br>
  
        <label for="budget">Budget</label><br>
        <input type="number" id="budget" v-model.number="gig.budget" required><br>
  
        <label for="gigDue">Delivery time (in days)</label><br>
        <input type="number" id="gigDue" v-model.number="gig.gigDue" required><br>
  
        <button type="submit">Post Gig</button>
      </form>
    </section>
  </template>
  
  <script>
  export default {
    name: "PostGig",
    data() {
      return {
        gig: {
          clientName: "",
          gigName: "",
          gigDescription: "",
          budget: null,
          gigDue: null,
          category: ""
        }
      };
    },
    methods: {
      async submitGig() {
        try {
          const response = await fetch("https://managrs-server.azurewebsites.net/newGig", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.gig)
          });
  
          if (!response.ok) {
            throw new Error("Failed to submit gig");
          }
  
          const data = await response.json();
          console.log("Gig posted successfully:", data);
          alert("Gig posted successfully!");
  
          // Optional: reset form
          this.gig = {
            clientName: "",
            gigName: "",
            gigDescription: "",
            budget: null,
            gigDue: null,
            category: ""
          };
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while posting the gig.");
        }
      },

      goToRecentGigs() {
          this.$router.push('/recent-gigs');
      }
    }
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
  input {
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
  