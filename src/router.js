import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import AuthLogin from './views/Auth/Login.vue'
import AuthRegister from './views/Auth/Register.vue'
import AuthReset from './views/Auth/Reset.vue'

import ProfileDecrypt from './views/Profile/Decrypt.vue'
import ProfileSetup from './views/Profile/Setup.vue'

import HomeLatest from './views/Home/Latest.vue'
import HomeSearch from './views/Home/Search.vue'
import HomeCategory from './views/Home/Category.vue'
import HomeManage from './views/Home/Manage.vue'
import HomeProfile from './views/Home/Profile.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
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
      path: '/auth/reset',
      name: 'auth_reset',
      component: AuthReset
    },
    {
      path: '/profile/decrypt',
      name: 'profile_decrypt',
      component: ProfileDecrypt
    },
    {
      path: '/profile/setup',
      name: 'profile_setup',
      component: ProfileSetup
    },
    {
      path: '/',
      component: Home,
      meta: {
        login: true
      },
      children: [
        {
          path: 'latest',
          name: 'home_latest',
          component: HomeLatest
        },
        {
          path: 'manage',
          name: 'home_manage',
          component: HomeManage
        },
        {
          path: 'search/:query',
          name: 'home_search',
          component: HomeSearch
        },
        {
          path: 'category/:category',
          name: 'home_category',
          component: HomeCategory
        },
        {
          path: 'profile',
          name: 'home_profile',
          component: HomeProfile
        },
        {
          path: '*',
          name: 'home',
          component: HomeCategory
        }
      ]
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.login)) {
    if (store.getters.logged_in) {
      next()
      return
    }
    next({ name: 'auth_login' })
  }
  else {
    next()
  }
})

export default router