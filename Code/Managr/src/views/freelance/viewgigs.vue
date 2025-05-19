<template>
  <section class="proposal-view">
    <h2 class="view-title">Applications</h2>
    <section class="proposal-card">
      <ViewgigCard
        v-for="item in Proposals"
        :key="item.id"
        :name="item.name"
        :mail="item.mail"
        :avatar="item.image"
        :content="item.content"
        :status="item.status"
      />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ViewgigCard from './viewgigCard.vue';

interface ProposalItem {
  id: number;
  name: string;
  mail: string;
  image: string;
  content: string;
  status: string;
}

export default defineComponent({
  name: 'ManageGigs',
  components: {
    ViewgigCard,
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
          status: gig.status,
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
  margin-bottom: 0.5rem;
}

.proposal-card {
  display: flex;
  flex-direction: column;
}
</style>
