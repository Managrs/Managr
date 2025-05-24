<template>
  <button @click="handlePayment" :disabled="milestone.status !== 'completed'">
    Pay ${{ milestone.price }}
  </button>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js';

const handlePayment = async () => {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const { data } = await axios.post('/api/create-payment-intent', {
    amount: props.milestone.price,
    milestoneId: props.milestone._id
  });

  await stripe.confirmPayment({
    clientSecret: data.clientSecret,
    confirmParams: { return_url: `${window.location.origin}/payment-success` }
  });
};
</script>