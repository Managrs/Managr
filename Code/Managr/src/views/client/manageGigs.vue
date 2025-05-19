<template>
  <section class="proposal-view">
    <button type="button" class="secondary-btn" @click="goBack">🔙 Back</button>
    <h2 class="view-title">All Proposals</h2>
    <section class="proposal-card">
      <ProposalCard v-for="item in Proposals" :key="item.id" :name="item.name" :mail="item.mail" :avatar="item.image"
        :content="item.content" :jobId="item.jobId" />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProposalCard from './proposalCard.vue';

interface ProposalItem {
  id: number;
  name: string;
  mail: string;
  image: string;
  content: string;
  jobId?: string;
}

export default defineComponent({
  name: 'ManageGigs',
  components: {
    ProposalCard,
  },
  data() {
    return {
      Proposals: [] as ProposalItem[],
    };
  },
  mounted() {
    const backendUrl = import.meta.env.VITE_API_URL;
    fetch(`${backendUrl}/applications`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch applications');
        return response.json();
      })
      .then(data => {
        this.Proposals = data.map((gig: any) => ({
          id: gig.id,
          name: gig.name,
          mail: gig.sender,
          image: gig.avatar,
          content: gig.content,
          jobId: gig.jobId,
        }));
      })
      .catch(error => {
        console.error('Error loading applications:', error);
      });
  },

  methods: {
    goBack() {
      //  Use this.$router to access the router instance in the Options API
      // @ts-ignore
      this.$router.go(-1);  // Navigate back in history
    }
  },
});
</script>

<style scoped>
.proposal-view {
  margin: 2rem;
}

.view-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.proposal-card {
  display: flex;
  flex-direction: column;
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
