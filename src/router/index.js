import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import Home from '@/views/home/Home.vue'
import topCategory from '@/views/category'
import Sub from '@/views/category/sub'
import Goods from '@/views/goods/index.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: topCategory },
      { path: '/category/sub/:id', component: Sub },
      { path: '/product/:id', component: Goods }

    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
