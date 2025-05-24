<template>
  <article class="card">
    <section class="freelance-info">
      <img class="freelancer-avatar" :src="avatar" alt="Freelancer Avatar" />
      <section class="freelancer-details">
        <p class="freelancer-name">{{ name }}</p>
        <p class="freelancer-mail">{{ mail }}</p>
      </section>
    </section>

    <section class="card-content">
      <h4 class="card-category">{{ jobTitle }}</h4>
      <p class="card-description">{{ jobDesc }}</p>
      <article class="budget-price"> {{ formatCurrency(jobBudget) }} </article>
      <h4 class="application-message"> Application Message: {{ content }}</h4>
      <p class="application-status">Status: {{ status }}</p>
    </section>

      <router-link :to="{ path: '/freelanceprogress', query: { clientName:name, clientEmail: mail, jobTitle: jobTitle, jobDesc: jobDesc } }">
           <button class="hire-button" v-if="status === 'Approved'" > Track Progress </button>
      </router-link>

  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'viewgigCard',
    props: {
        id: {
        type: String,
        required: true,
      },
        name: {
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
    methods: {
        formatCurrency(value: number) {
          return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            minimumFractionDigits: 2,
          }).format(value);
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
    margin-left: 6%;
    margin-top: -5%;
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

.application-status {
  font-size: 0.9rem;
  color: #555;
  margin-top: 8px;
}

.hire-button {
  padding: 0.5rem 1.2rem;
  font-size: 14px;
  background-color: #28a745; 
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  color: #fff;
}

.hire-button:hover {
  background-color: #218838;
  transform: scale(1.02);
}
</style>