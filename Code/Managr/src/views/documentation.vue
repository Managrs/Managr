<template>
    <main class="page-container">
      <section class="hero">
        <section class="content">
          <h1 class="title">Empowering Projects with <span class="highlight">Managr</span></h1>
          <p class="description">
            Managr is a seamless platform connecting clients and freelancers. Whether you're a skilled professional or a project starter,
            Managr is your destination for collaboration at the right price.
          </p>
          <button class="btn-primary" @click="handleLogin">Sign Up</button>
        </section>
      </section>
  
      <section class="info">
        <section class="info-content">
          <h2>Now it's easier because <article class="highlight">you can customize everything</article> with Managr</h2>
          <p>
            Clients can post projects, and our best freelancers—tailored to your needs—will apply. Choose who suits your project best
            and collaborate online from anywhere, effortlessly.
          </p>
        </section>
      </section>
    </main>
</template>
  

<script lang="ts">
import router from '../router';

export default{
  name: 'Documentation',

  setup() {

    const handleLogin = () => {
      router.push("/signup");
    };

    return {
      handleLogin,
    }
  }
}
</script>


<style scoped>
.page-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2b2b2b;
}

.hero {
  background: linear-gradient(135deg, #b9821b, #4cd3e8);
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.content {
  max-width: 700px;
  margin: auto;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
}

.highlight {
  color: #8c44b9;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.btn-primary {
  background-color: white;
  color: #bc7430;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background-color: #f0f0f0;
}

.info {
  background-color: #f9f9f9;
  padding: 80px 20px;
  text-align: center;
}

.info-content {
  max-width: 700px;
  margin: auto;
}

.info-content h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

</style>
