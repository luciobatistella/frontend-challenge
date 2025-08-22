import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/order/:id',
      name: 'order-detail',
      component: () => import('../views/OrderDetailView.vue'),
    },
  ],
})

export default router
