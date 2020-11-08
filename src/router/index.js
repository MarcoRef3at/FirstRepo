import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/features',
  },
  {
    path: '/features',
    name: 'features',
    component: Index,
  },

  {
    path: "/features/:id",
    name: "feature-details",
    component: () => import("../components/feature-template"),
  },
  {
    path: "/print/:id",
    name: "print_preview",
    component: () => import("../components/PrintPreview"),
  },

  {
    path: "/add",
    name: "add",
    component: () => import("../components/feature-add"),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
