<template>
  <nav>
    <button type="button" class="secondary-btn" @click="goBack">🔙 Back</button>
  </nav>

  <section class="post-page">
    <h2 class="page-title">Make a Report.</h2>
    <form @submit.prevent="submitReport">
      <label for="clientName">Client Name</label><br>
      <input type="text" placeholder="Write your user name" id="clientName" v-model="report.clientName" required
        readonly><br>

      <label for="reportTitle">Report Title</label><br>
      <input type="text" placeholder="What are you reporting" id="reportTitle" v-model="report.reportTitle"
        required><br>

      <label for="reportDescription">Report Description</label><br>
      <textarea id="reportDescription" v-model="report.reportDescription" placeholder="Describe the issue you had"
        required rows="5" style="resize: vertical; width: 100%; padding: 0.5rem; margin-bottom: 1rem;">
      </textarea><br>

      <button type="submit">Submit Report</button>
    </form>
  </section>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
const router = useRouter();

export default {
  name: "PostReport",
  data() {
    return {
      report: {
        clientName: "",
        reportTitle: "",
        reportDescription: "",
      }
    };
  },
  mounted() {
    const userStore = useUserStore();
    this.report.clientName = userStore.name;
  },
  methods: {
    goBack() {
      // Use this.$router to access the router instance in the Options API
      this.$router.go(-1);  // Navigate back in history
    },
//       router.history.back();

    async submitReport() {
      try {
        const backendUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${backendUrl}/newReport`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.report)
        });

        if (!response.ok) {
          throw new Error("Failed to submit report");
        }

        const data = await response.json();
        console.log("Report posted successfully:", data);
        alert("Report posted successfully!");

        // Reset the form
        this.report.reportTitle = "";
        this.report.reportDescription = "";
        // Keep clientName
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the report.");
      }
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