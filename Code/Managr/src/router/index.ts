import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import DashboardLayout from '../views/DashboardLayout.vue'

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },

  {path: '/dashboard',name: 'DashboardLayout',component: DashboardLayout}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
