<template>
    <article class="card">
        <section class="freelancer-info">
            <img class="freelancer-avatar" :src="avatar"/>
            <section class="freelancer-details">
                <p class="freelancer-name">{{ name }}</p>
                <p class="freelancer-mail"> {{ mail }}</p>
            </section>
        </section>

        <section class="application-content">
            <h3 class="application-message"> {{ content }}</h3>
        </section>


        <button class="hire-button" @click="Hire"> Hire </button>
        <button class="reject-button" @click="Reject"> Reject </button>

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
    }
    },
    data() {
      return {
        showPopup: false,
        popupMessage: ''
      };
    },
    methods: {
        async Hire() {
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
  padding: 0.4rem 2rem;
  color: #f4f5f7;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 15px;
  font-weight: 500;
  background-color: rgb(37, 55, 73);
  border-radius: 0.275rem;
  cursor: pointer;
}

.hire-button:hover,
.reject-button:hover {
  background: #202c39;
  color: #ffffff;
}
</style>