<template>
  <section class="proposal-view">
    <h2 class="view-title">All Proposals</h2>
    <section class="proposal-card">
      <ProposalCard
        v-for="item in Proposals"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :mail="item.mail"
        :avatar="item.image"
        :content="item.content"
        :jobId="item.jobId"
      />
    </section>
  </section>
</template> 

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../stores/userStore';
import ProposalCard from './proposalCard.vue';

interface ProposalItem {
  id: string;
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
    const userStore = useUserStore();
    const backendUrl = import.meta.env.VITE_API_URL;
    fetch(`${backendUrl}/jobRequests/${userStore.email}`)
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
        }));
      })
      .catch(error => {
        console.error('Error loading applications:', error);
      });
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
</style>
