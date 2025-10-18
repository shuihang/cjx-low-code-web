import { createRouter, createWebHistory } from 'vue-router'

import TopBar from "../components/topBar/index.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '首页',
        isAuth: false,
      },
      components: {
        default: import('@/views/home/index.vue'),
        TopBar: <TopBar type="home" buttonAuth="default" />,
      }
    },
    {
      path: '/form-design',
      name: 'FormDesign',
      components: {
        default: import('@/views/formDesign/index.vue'),
        TopBar: <TopBar type="form-design" buttonAuth="editor" />,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/me',
      name: 'Me',
      component: () => import('@/views/me/index.vue')
    }
  ]
})

export default router

