<template>
  <article class="card">
    <section class="freelance-info">
      <img class="freelancer-avatar" :src="avatar" alt="Freelancer Avatar" />
      <section class="freelancer-details">
        <p class="freelancer-name">{{ name }}</p>
        <p class="freelancer-mail">{{ mail }}</p>
      </section>
    </section>

    <section class="application-content">
      <h3 class="application-message">{{ content }}</h3>
      <p class="application-status">Status: {{ status }}</p>
    </section>

    <button class="hire-button" v-if="status === 'Approved'" >Message</button>
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
        async Message(){
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/application`, {
                    method: "PUT"
                });
                const data = await res.json();
                console.log(data.message);
            } catch(err){
                console.error('Error:', err);
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

.hire-button{
  display: block;
  margin-left: 0%;
  padding: 0.4rem 3.9rem;
  color: #f4f5f7;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 15px;
  font-weight: 500;
  background-color: rgb(37, 55, 73);
  border-radius: 0.275rem;
}
.hire-button:hover{
  background: #202c39;
  color: #ffffff;
}
</style>