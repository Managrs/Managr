import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeP.vue';  // Example component
import About from '../views/AboutP.vue';  // Example component

const routes = [
  { path: '/', component: Home },
  { path: '/aboutP', component: About },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
