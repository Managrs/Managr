<template>
  <dialog ref="dialog">
    <h3>Submit Feedback</h3>
    <textarea v-model="feedback" placeholder="Your feedback..."></textarea>
    <label>
      Rating: 
      <select v-model="rating">
        <option v-for="n in 5" :value="n">{{ n }} ★</option>
      </select>
    </label>
    <button @click="submitFeedback">Submit</button>
  </dialog>
</template>

<script setup>
const feedback = ref('');
const rating = ref(5);

const submitFeedback = async () => {
  await axios.post(`/api/contracts/${contractId}/milestones/${milestoneId}/feedback`, {
    feedback: feedback.value,
    rating: rating.value
  });
};
</script>