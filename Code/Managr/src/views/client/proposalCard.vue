<template>
    <article class="card">
        <section class="freelancer-info">
            <img class="freelancer-avatar" :src="avatar"/>
            <section class="freelancer-details">
                <p class="freelancer-name">{{ ClientName }}</p>
                <p class="freelancer-mail"> {{ mail }}</p>
            </section>
        </section>

        <section class="card-content">
          <h4 class="card-category">{{ jobTitle }}</h4>
          <p class="card-description">{{ jobDesc }}</p>
          <article class="budget-price"> {{ formatCurrency(jobBudget) }} </article>
          <h4 class="application-message"> Application Message: {{ content }}</h4>
        </section>

        <section class="proposal-actions">
          <section v-if="status === 'Submitted'" class="action-buttons">
            <button class="hire-button" @click="Hire">Hire</button>
            <button class="reject-button" @click="Reject">Reject</button>
          </section>

          <section v-else-if="status === 'Approved'" class="action-buttons">
              <router-link :to="{ path: '/clientprogress', query: {jobTitle: jobTitle, jobDesc: jobDesc,  clientName: ClientName, clientMail:mail } }">
                  <button class="hire-button">Track Progress</button>
              </router-link>
          </section>
        </section>


        <Popup :visible="showPopup" @close="showPopup = false">
            <p>{{ popupMessage }}</p> 
        </Popup>
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import Popup from '../freelance/popup.vue';

export default defineComponent({
    name: 'ProposalCard',
    props: {
      id: {
        type: String,
        required: true,
      },
      ClientName: {
      type: String,
      required: true,
    },
    mail:{
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    jobTitle:{
      type: String,
      required: true,     
    },
    jobDesc: {
      type: String,
      required: true,
    },
    jobBudget:  {
      type: Number,
      required: true,
    },
    content: {
        type:String,
        required: true,
    },
    status: {
      type: String,
      required: true, 
    }
    },
    data() {
      return {
        showPopup: false,
        popupMessage: ''
      };
    },
    methods: {
        formatCurrency(value: number) {
          return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            minimumFractionDigits: 2,
          }).format(value);
        },
        async Hire() {
          console.log("Approving application with ID:", this.id);
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/approve/${this.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              }
            });

            const data = await res.json(); 
            if (!res.ok) throw new Error(data.error || "Failed to approve");

            this.popupMessage = "Proposal APPROVED successfully!";
            this.showPopup = true;
            setTimeout(() => this.showPopup = false, 1000);
          } catch (err) {
            console.error("Error:", err);
            this.popupMessage = "Failed to approve proposal.";
            this.showPopup = true;
            setTimeout(() => this.showPopup = false, 1000);
          }
        },
        async Reject(){
            try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/reject/${this.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              }
            });

            const data = await res.json(); 
            if (!res.ok) throw new Error(data.error);
                        this.popupMessage = "Proposal has been REJECTED!";
            this.showPopup = true;
            setTimeout(() => this.showPopup = false, 1000);
            } catch(err){
                console.error('Error:', err);
                    this.popupMessage = "Failed to REJECT proposal.";
                    this.showPopup = true;
            }
        }
    }

});
</script>

<style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    background-color: white;
    margin-bottom: 0.2rem;
  }

.freelancer-info{
  width: 100%;
  height: 50px;
  display: flex;
  border-radius:7.5px;
  align-items: center;
  background: white;
}

.freelancer-avatar{
  width: 45px;
  height: 45px;
  margin: 2%;
  background: var(--color-light-gray);
  border-radius: 50%;
  overflow: hidden;
}

.freelancer-details {
  line-height: 0.5%;
  text-align: center;
}

.freelancer-name{
  font: bold;
  font-size: 15px;
  color: black;
}

.freelancer-mail{
  font:italic;
  font-size: 10px;;
}

.hire-button,
.reject-button {
  padding: 0.5rem 1.2rem;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  color: #fff;
}

.hire-button {
  background-color: #28a745; /* Bootstrap-style green */
}

.hire-button:hover {
  background-color: #218838;
  transform: scale(1.02);
}

.reject-button {
  background-color: #dc3545; /* Bootstrap-style red */
}

.reject-button:hover {
  background-color: #c82333;
  transform: scale(1.02);
}
</style>