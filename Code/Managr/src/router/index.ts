// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import 'core-js/stable/promise';

// Define the routes with type annotations
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HelloWorld.vue'),
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../components/Signing.vue'),
  },
  {
    path: '/client',
    name: 'client',
    component: () => import('../views/Client.vue'),
    meta: {
      requiresAuth: true, // Protect this route
    },
  },
  
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      requiresAuth: true, // Protect this route
    },
  },

  {
    path: '/freelance',
    name: 'freelance',
    component: () => import('../views/Freelance.vue'),
    meta: {
      requiresAuth: true, // Protect this route
    },

  },

];

// Create the router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


/*
// Add a navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth0();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Redirect to the login page if the route requires authentication
    next({ name: 'sign' });
  } else {
    next();
  }
});
*/
export default router;
