<template>
  <form @submit.prevent="createContract">
    <h2>New Contract</h2>
    
    <!-- Freelancer Selection -->
    <label>
      Freelancer:
      <select v-model="freelancerId" required>
        <option v-for="f in freelancers" :value="f._id">{{ f.name }}</option>
      </select>
    </label>

    <!-- Contract Details -->
    <label>
      Title: <input v-model="title" required>
    </label>
    <label>
      Description: <textarea v-model="description" required />
    </label>

    <!-- Milestones -->
    <fieldset v-for="(milestone, i) in milestones" :key="i">
      <legend>Milestone {{ i + 1 }}</legend>
      <input v-model="milestone.name" placeholder="Name" required>
      <textarea v-model="milestone.description" placeholder="Description"></textarea>
      <input v-model="milestone.price" type="number" min="0" placeholder="Price" required>
      <input v-model="milestone.deadline" type="date" required>
      <button type="button" @click="removeMilestone(i)">Remove</button>
    </fieldset>

    <button type="button" @click="addMilestone">+ Add Milestone</button>
    <button type="submit">Create Contract</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const title = ref('');
const description = ref('');
const freelancerId = ref('');
const milestones = ref([{ name: '', description: '', price: 0, deadline: '' }]);

const addMilestone = () => milestones.value.push({ name: '', description: '', price: 0, deadline: '' });
const removeMilestone = (index) => milestones.value.splice(index, 1);

const createContract = async () => {
  await axios.post('/api/contracts', {
    title: title.value,
    description: description.value,
    freelancerId: freelancerId.value,
    milestones: milestones.value
  });
  // Redirect to contract list
};
</script>