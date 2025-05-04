<template>
  <main class="role-selection">
    <h1>Select Your Role</h1>
    <form @submit.prevent="submitRole">
      <label>
        <input type="radio" value="client" v-model="role" /> Client
      </label>
      <label>
        <input type="radio" value="freelancer" v-model="role" /> Freelancer
      </label>

      <button type="submit" :disabled="!role || loading">
        {{ loading ? 'Submitting...' : 'Submit' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const role = ref('');
const error = ref('');
const loading = ref(false);

const route = useRoute();
const router = useRouter();
const userId = ref('');

onMounted(() => {
  userId.value = route.query.user_id;
  if (!userId.value) {
    error.value = 'Missing user ID in URL';
  }
});

async function submitRole() {
  if (!role.value || !userId.value) return;

  loading.value = true;
  error.value = '';

  try {
    await axios.post('https://your-api.com/api/set-role', {
      user_id: userId.value,
      role: role.value,
    });

    // Optionally redirect based on role
    if (role.value === 'client') router.push('/dashboardclient');
    else if (role.value === 'freelancer') router.push('/dashboardfreelance');
  } catch (err) {
    error.value = err?.response?.data?.message || 'Failed to save role.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.role-selection {
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
}
label {
  display: block;
  margin-bottom: 10px;
}
button {
  padding: 10px 20px;
  margin-top: 15px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
