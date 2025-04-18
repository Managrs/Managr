import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import dashboardclient from '../views/dashboardclient.vue'
import dashboardadmin from '../views/dashboardadmin.vue'
import AdminDashboard from '../components/AdminSide.vue'

//admin routers
import Aauditlogs from '../views/Admin/Aauditlogs.vue'
import Adashboard from '../views/Admin/Adashboard.vue'
import Aorders from '../views/Admin/Aorders.vue'
import Aproducts from '../views/Admin/Aproducts.vue'
import Aprofile from '../views/Admin/Aprofile.vue'
import Ausers from '../views/Admin/Ausers.vue'
import Areports from '../views/Admin/Areports.vue'
import PostGig from '../views/client/postGig.vue'
import ManageGigs from '../views/client/manageGigs.vue'

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/DashboardClient', name: 'dashboardclient', component: dashboardclient },
  {path: '/Admindashboard',name: 'AdminDashboard', component: AdminDashboard},
  {path: '/dashboard',name: 'DashboardLayout', component: DashboardLayout},
  
  {
    path: '/dashboardadmin',
    component: dashboardadmin,
    children: [
      { path: '', redirect: '/Adashboard' },
      { path: '/Adashboard', component: Adashboard },
      { path: '/Aauditlogs', component: Aauditlogs },
      { path: '/Ausers', component: Ausers },
      { path: '/Areports', component: Areports },
      { path: '/Aproducts', component: Aproducts },
      { path: '/Aorders', component: Aorders },
      {path:'/Aprofile', component: Aprofile}
    ]
  },
  {path: '/postgig',name: 'postGig', component: PostGig},
  {path: '/managegig',name: 'manageGig', component: ManageGigs}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
