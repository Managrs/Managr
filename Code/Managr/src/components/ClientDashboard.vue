  <template>
  <header>
    <section class="logo">
      <img src="/logo2.png" alt="Managr Logo" />
    </section>
    <nav>
      <button class="post-btn">Post Project</button>
      <button class="messages-btn">Messages</button>
      <section class="profile-picture">
        <img src="/noprofile.png" alt="Profile Picture" />
      </section>
    </nav>
  </header>

  <main>
    <section class="search-container">
      <h2>Find Trusted Freelancers for Your Everyday Needs</h2>
      <input
        type="text"
        class="search-bar"
        placeholder="What can I help you with"
        v-model="searchTitle"
      />

      <section class="price-inputs">
        <input
          type="number"
          v-model.number="minPrice"
          placeholder="Min Price (R)"
        />
        <input
          type="number"
          v-model.number="maxPrice"
          placeholder="Max Price (R)"
        />
      </section>

      <button id="search-btn" @click="searchFreelancers">Search</button>
    </section>

    <section
      class="freelancer-results"
      v-if="hasSearched"
    >
      <h4>Freelancer Results</h4>
      <section id="results-container">
        <h4 v-if="results.length">Results for "{{ searchTitle }}"</h4>
        <p v-else>No freelancers found in that price range.</p>
        <article
          v-for="(f, i) in results"
          :key="i"
          class="freelancer-profile"
        >
          <section class="profile-header">
            <img
              src="/noprofile.png"
              alt="Profile Picture"
              class="profile-pic"
            />
            <h4>{{ f.name }}</h4>
          </section>
          <section class="profile-info">
            <p>Title: {{ f.title }}</p>
            <p>Price: {{ f.price }}</p>
            <p>Skills: {{ f.skills.join(', ') }}</p>
          </section>
        </article>
      </section>
    </section>
  </main>

  <section class="freelancer-section" id="freelancer-categories">
    <h3>Freelancer Categories</h3>
    <section class="freelancer-scroll">
      <article
        v-for="(cat, i) in categories"
        :key="i"
        class="category-box"
      >
        {{ cat }}
      </article>
    </section>
  </section>
</template>

<script>
export default {
  name: 'FreelancerDashboard',
  data() {
    return {
      searchTitle: '',
      minPrice: 0,
      maxPrice: Infinity,
      results: [],
      hasSearched: false,
      categories: [
        'Web Design', 'Graphic Design', 'Writing', 'Marketing',
        'Software Development', 'Mobile App Development', 'SEO',
        'Data Science', 'Video Editing', 'Translation',
        'Virtual Assistance', 'Music Production'
      ],
      // Dummy data
      mockFreelancers: [
        { name: "John Doe", title: "Web Design", price: "R950/hr", skills: ["HTML", "CSS", "JavaScript"] },
        { name: "Jane Smith", title: "Web Design", price: "R850/hr", skills: ["HTML", "CSS", "React"] },
        { name: "Emily Adams", title: "Graphic Design", price: "R1200/hr", skills: ["Photoshop", "Illustrator", "InDesign"] },
        { name: "Mark Lee", title: "Graphic Design", price: "R1100/hr", skills: ["Photoshop", "Illustrator", "Logo Design"] },
        { name: "Chris Brown", title: "Writing", price: "R700/hr", skills: ["Creative Writing", "SEO", "Copywriting"] },
        { name: "Anna Davis", title: "Writing", price: "R650/hr", skills: ["Content Writing", "Blogging", "SEO"] },
        { name: "Lebo Mokoena", title: "Translation", price: "R500/hr", skills: ["Zulu", "English", "Afrikaans"] },
        { name: "Sipho Dlamini", title: "Mobile App Development", price: "R1500/hr", skills: ["Flutter", "Dart", "Firebase"] },
        { name: "Thandiwe Ndlovu", title: "Data Analysis", price: "R1300/hr", skills: ["Python", "Pandas", "Excel"] },
        { name: "Jason Pillay", title: "Video Editing", price: "R900/hr", skills: ["Premiere Pro", "Final Cut", "After Effects"] },
        { name: "Mpho Maleka", title: "Music Production", price: "R1100/hr", skills: ["Logic Pro", "FL Studio", "Mixing"] },
        { name: "Zanele Khumalo", title: "Virtual Assistance", price: "R600/hr", skills: ["Scheduling", "Admin", "Customer Service"] }
      ]
    };
  },
  methods: {
    parsePrice(priceStr) {
      const match = priceStr.match(/R(\d+)/);
      return match ? parseInt(match[1]) : 0;
    },
    searchFreelancers() {
      this.hasSearched = true;
      // Filter local dummy data
      this.results = this.mockFreelancers.filter(f => {
        const fPrice = this.parsePrice(f.price);
        return (
          f.title.toLowerCase().includes(this.searchTitle.toLowerCase()) &&
          fPrice >= this.minPrice &&
          fPrice <= this.maxPrice
        );
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Calibri, sans-serif;
  background: linear-gradient(45deg, #e77e23, #2b3d4f); /* Orange and Dark Blue streaks */
  color: #000000;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  color: #000;
}

.logo img {
  height: 1.5rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.post-btn, .messages-btn {
  background: #fff;
  color: #000;
  border: 2px solid #000;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  margin-top: 5rem; /* Ensure main content does not overlap header */
}

.search-container {
  text-align: center;
  margin-bottom: 3rem;
}

.search-container h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.search-bar {
  padding: 0.9rem 1.5rem;
  width: 100%;
  max-width: 700px;
  border: 2px solid #000;
  font-size: 1rem;
  border-radius: 50px;
}

.price-inputs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.price-inputs input {
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  border: 2px solid #000;
  border-radius: 25px;
  width: 150px;
}

.freelancer-section {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 3rem; /* Give space below freelancer section */
}

.freelancer-section h3 {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1rem;
}

.freelancer-scroll {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-behavior: smooth;
}

.category-box {
  min-width: 100px;
  height: 100px;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: bold;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.freelancer-results {
  width: 100%;
  max-width: 1000px;
  margin-top: 2rem;
}

.freelancer-results h4 {
  margin-bottom: 1rem;
  text-align: center;
}

.freelancer-results article {
  background: #f4f4f4;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.freelancer-results article h4 {
  margin-bottom: 0.5rem;
}

.freelancer-results article p {
  margin-bottom: 0.5rem;
}

#search-btn {
  background-color: #000;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#search-btn:hover {
  background-color: #333;
}

</style>
