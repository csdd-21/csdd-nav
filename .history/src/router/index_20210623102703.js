import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/websites',
        name: 'websites',
        component: () => import('../views/Websites.vue'),
      },
      // {
      //   path: '/githubs',
      //   name: 'githubs',
      //   component: () => import('../views/Githubs.vue'),
      // },
      // {
      //   path: '/studies',
      //   name: 'studies',
      //   component: () => import('../views/Studies.vue'),
      // },
      // {
      //   path: '/tests',
      //   name: 'tests',
      //   component: () => import('../views/Tests.vue'),
      // },
    ]
  },
]
const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
