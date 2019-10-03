import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AuthLogin from './views/Auth/Login.vue'
import AuthRegister from './views/Auth/Register.vue'
import AuthRestore from './views/Auth/Restore.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth/login',
      name: 'auth_login',
      component: AuthLogin,
    },
    {
      path: '/auth/register',
      name: 'auth_register',
      component: AuthRegister
    },
    {
      path: '/auth/restore',
      name: 'auth_restore',
      component: AuthRestore
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
