import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home/HomePage.vue'
import StockPage from '../views/StockPage/StockPage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/stock/:ticker',
    component: StockPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
