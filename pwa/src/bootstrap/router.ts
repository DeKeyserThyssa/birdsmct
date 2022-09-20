import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'
// import ClientError from '../screens/generic/ClientError.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../screens/Home.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ClientError',
    // component: () => ClientError,
    component: () => import('../screens/generic/ClientError.vue'),
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
