import { createRouter, createWebHistory } from 'vue-router';
//import { useAuth0 } from '@auth0/auth0-vue';

import LandingPage from '../components/LandingPage.vue';
import DashboardLayout from '../views/DashboardLayout.vue';
import dashboardadmin from '../views/dashboardadmin.vue';
import AdminDashboard from '../components/AdminSide.vue';

import loginPage from '../views/loggings/loginPage.vue';
import signupPage from '../views/loggings/signupPage.vue';
import display from '../views/loggings/displayTester.vue';
import freelanceTrack from '../views/tracking/freelanceTracking.vue';
import clientTrack from '../views/tracking/clientTracking.vue';

import freelanceprogress from '../views/tracking/freelanceprogress.vue';
import clientprogress from '../views/tracking/clientprogress.vue';

//admin routers
import Aorders from '../views/Admin/Aorders.vue';
import Aproducts from '../views/Admin/Aproducts.vue';
import Aprofile from '../views/Admin/Aprofile.vue';
import Ausers from '../views/Admin/Ausers.vue';
import Areports from '../views/Admin/Areports.vue';
import PostGig from '../views/client/postGig.vue';
import MakeReport from '../views/client/makeReport.vue';
import ManageGigs from '../views/client/manageGigs.vue';
import Dashboardclient from '../views/dashboardclient.vue';
import Documentation from '../views/documentation.vue';
import ApplyPost from '../views/freelance/applyPost.vue';
import Chatbox from '../views/client/Chatbox.vue';
import profileSettings from '../views/profileSettings/profileSettings.vue';
import Viewgigs from '../views/freelance/viewgigs.vue';
import EditProfile from '../views/editProfile.vue';

const routes = [
  {path: '/', name: 'LandingPage', component: LandingPage },
  {path: '/Dashboardclient' , name: 'Dashboardclient' , component: Dashboardclient},
  {path: '/Admindashboard',name: 'AdminDashboard', component: AdminDashboard},
  {path: '/dashboardfreelance',name: 'DashboardLayout', component: DashboardLayout},
  {path: '/documentation', name: 'documentation', component:Documentation},

  {path: '/login', name: 'loginPage', component:loginPage},
  {path: '/signup', name: 'signupPage', component:signupPage},
  {path: '/display', name: 'display', component:display},
  {path: '/profileSettings', name: 'profileSettings', component:profileSettings},
  {path: '/freelanceprogress', name: 'freelanceprogress', component:freelanceprogress},
  {path: '/clientprogress', name: 'clientprogress', component:clientprogress},

  {path: '/freelanceTrack', name: 'freelanceTrack', component:freelanceTrack},
  {path: '/clientTrack', name: 'clientTrack', component:clientTrack},


  {
    path: '/dashboardadmin',
    component: dashboardadmin,
    children: [
      { path: '/Ausers' ,name: 'Ausers', component: Ausers },
      { path: '/Areports' ,name: 'Areports', component: Areports },
      { path: '/Aproducts' ,name: 'Aproducts', component: Aproducts },
      { path: '/Aorders' ,name: 'Aorders', component: Aorders },
      {path:'/Aprofile' ,name: 'Aprofile', component: Aprofile}
    ]
  },
  {path: '/postgig',name: 'postGig', component: PostGig},
  {path: '/makeReport',name: 'makeReport', component: MakeReport},
  {path: '/managegig',name: 'manageGig', component: ManageGigs},
  {path: '/viewgigs',name: 'viewgigs', component: Viewgigs},
  {path: '/applypost', name: 'applypost', component: ApplyPost},
  {path: '/chatsystem', name:'chatsystem', component:Chatbox},
  {path: '/editprofile', name:'editprofile', component:EditProfile}
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
