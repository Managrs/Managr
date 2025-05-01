<template>
  <article class="card">
    <section class="client-info">
      <img class="client-avatar"  :src="avatar" />
      <section class="user-details">
        <p class="client-name"> {{ name }} </p>
        <p class="client-mail"> {{mail}} </p>
      </section>
    </section>

    <section class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <h4 class="card-category">{{ category }}</h4>
      <p class="card-description">{{ description }}</p>
      <section class="time-price">
        <article class="budget-price"> {{ formatCurrency(budget) }} </article>
        <article class="time-est"> {{ formatTime(time) }}</article>
      </section>
      <router-link :to="{ path: '/applypost', query: { clientEmail: mail } }">
        <button class="apply-button">Apply for Gig</button>
      </router-link>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategoryCard',
  props: {
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  methods: {
    formatCurrency(value: number) {
      return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2,
      }).format(value);
    },
    formatTime(days: Number) {
      return `${days} days`; // You can change the format here
    }
  },
});
</script>


<style scoped>
.card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 280px;
  background: white;
  margin: 1rem;
  z-index: 1;
}

.card:hover {
  transform: translateY(-5px);
  z-index: 2;
}

.client-info{
  width: 100%;
  height: 50px;
  display: flex;
  border-radius:7.5px;
  align-items: center;
  background: white;
}

.client-avatar{
  width: 45px;
  height: 45px;
  margin: 2%;
  background: var(--color-light-gray);
  border-radius: 50%;
  overflow: hidden;
}

.user-details {
  line-height: 0.5%;
  text-align: center;
}

.client-name{
  font: bold;
  font-size: 15px;
  color: black;
}

.client-mail{
  font:italic;
  font-size: 10px;;
}

.card-title {
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
}

.card-content {
  padding: 0.5rem;
}

.card-category {
  color: #111;
  font-weight: bold;
}

.card-description {
  color: #111;
  font-size: 0.9rem;
}

.time-price {
  display: flex;
}

.budget-price {
  display: block;
  margin-right: 35%;
  padding: .2rem .5rem;
  color: rgb(0, 4, 6);
  font-family: sans-serif;
}


.apply-button{
  display: block;
  margin-left: 35%;
  position: relative;
  padding: 0.4rem 2.5rem;
  color: #f4f5f7;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 15px;
  font-weight: 500;
  background-color: rgb(37, 55, 73);
  border-radius: 0.275rem;
}
.apply-button:hover{
  background: #202c39;
  color: #ffffff;
}

</style>
