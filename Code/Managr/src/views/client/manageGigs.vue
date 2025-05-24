<template>
  <section class="proposal-view">
    <button type="button" class="secondary-btn" @click="goBack"> Back</button>
    <h2 class="view-title">All Proposals</h2>
    <section class="proposal-card">
      <ProposalCard
        v-for="item in Proposals"
        :key="item.id"
        :id="item.id"
        :ClientName="item.ClientName"
        :mail="item.mail"
        :avatar="item.image"
        :status="item.status"
        :content="item.content"
        :jobTitle="item.jobTitle"
        :jobDesc="item.jobDesc"
        :jobBudget="Number(item.jobBudget)"
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
  ClientName: string;
  mail: string;
  image: string;
  status: string;
  content: string;
  jobTitle:string;
  jobDesc: string;
  jobBudget: Number;
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
          ClientName: gig.name,
          mail: gig.sender,
          image: gig.avatar,
          content: gig.content,
          jobTitle:gig.jobTitle,
          jobDesc: gig.jobDesc,
          status: gig.status,
          jobBudget: gig.jobBudget,
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
