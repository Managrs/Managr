import { createRouter, createWebHistory } from 'vue-router';

//import { useAuth0 } from '@auth0/auth0-vue';

import LandingPage from '../components/LandingPage.vue';
import DashboardLayout from '../views/DashboardLayout.vue';
import dashboardclient from '../views/dashboardclient.vue';
import dashboardadmin from '../views/dashboardadmin.vue';
import AdminDashboard from '../components/AdminSide.vue';

//admin routers
import Aauditlogs from '../views/Admin/Aauditlogs.vue';
import Adashboard from '../views/Admin/Adashboard.vue';
import Aorders from '../views/Admin/Aorders.vue';
import Aproducts from '../views/Admin/Aproducts.vue';
import Aprofile from '../views/Admin/Aprofile.vue';
import Ausers from '../views/Admin/Ausers.vue';
import Areports from '../views/Admin/Areports.vue';
import PostGig from '../views/client/postGig.vue';
import ManageGigs from '../views/client/manageGigs.vue';

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/DashboardClient', name: 'dashboardclient', component: dashboardclient },
  {path: '/Admindashboard',name: 'AdminDashboard', component: AdminDashboard},
  {path: '/dashboard',name: 'DashboardLayout', component: DashboardLayout},
  
  {
    path: '/dashboardadmin',
    component: dashboardadmin,
    children: [
      { path: '' ,name: 'Adashboard', redirect: '/Adashboard' },
      { path: '/Adashboard' ,name: 'Adashboard', component: Adashboard },
      { path: '/Aauditlogs' ,name: 'Aauditlogs', component: Aauditlogs },
      { path: '/Ausers' ,name: 'Ausers', component: Ausers },
      { path: '/Areports' ,name: 'Areports', component: Areports },
      { path: '/Aproducts' ,name: 'Aproducts', component: Aproducts },
      { path: '/Aorders' ,name: 'Aorders', component: Aorders },
      {path:'/Aprofile' ,name: 'Aprofile', component: Aprofile}
    ]
  },
  {path: '/postgig',name: 'postGig', component: PostGig},
  {path: '/managegig',name: 'manageGig', component: ManageGigs}
  /*
  {
    path: '/client',
    name: 'client',
    component: () => import('../views/Client.vue'),
    meta: {
      requiresAuth: true, // Protect this route
    },
  },*/
/*
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      requiresAuth: true, // Protect this route
    },
  },*/
/*
  {
    path: '/freelance',
    name: 'freelance',
    component: () => import('../views/Freelance.vue'),
    meta: {
      requiresAuth: true, // Protect this route
    },

  },*/
]

const router = createRouter({
  history: createWebHistory(),
  routes
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
