import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import Home from '@/views/home/Home.vue'
import topCategory from '@/views/category'
import Sub from '@/views/category/sub.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: topCategory },
      { path: '/category/sub/:id', component: Sub }

    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
