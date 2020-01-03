import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'

import AuthLogin from './views/Auth/Login.vue'
import AuthRegister from './views/Auth/Register.vue'
import AuthReset from './views/Auth/Reset.vue'

import HomeIndex from './views/Home/Home.vue'
import HomeSearch from './views/Home/Search.vue'
import HomeCategory from './views/Home/Category.vue'
import HomeManage from './views/Home/Manage.vue'
import HomeProfile from './views/Home/Profile.vue'

import CreateCategory from './views/Home/Dialogs/CreateCategory'
import CreateEntity from './views/Home/Dialogs/CreateEntity'

import NavsProfile from './views/Navs/Profile'
import NavsBasic from './views/Navs/Basic'

import store from './store'
import { alert, UI_REQUIRE_AUTH, UI_ALREADY_AUTH } from '@/modules/ui';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth/',
      components: {
        default: Auth,
        nav: NavsBasic
      },
      meta: {
        title: "Authorization",
        login: false
      },
      children: [
        {
          path: 'login',
          name: 'auth_login',
          component: AuthLogin,
          meta: {
            title: "Login"
          }
        },
        {
          path: 'register',
          name: 'auth_register',
          component: AuthRegister,
          meta: {
            title: "Register"
          }
        },
        {
          path: 'reset',
          name: 'auth_reset',
          component: AuthReset,
          meta: {
            title: "Password restore"
          }
        }
      ]
    },
    {
      path: '/home/',
      components: {
        default: Home,
        nav: NavsProfile
      },
      meta: {
        login: true,
        title: "Home"
      },
      children: [
        {
          path: '/',
          name: 'home_index',
          components: {
            default: HomeIndex,
            create: CreateEntity
          },
          meta: {
            title: "General"
          }
        },
        {
          path: 'manage',
          name: 'home_manage',
          components: {
            default: HomeManage,
            create: CreateCategory
          },
          meta: {
            title: "Manage Categories"
          }
        },
        {
          path: 'search/:query',
          name: 'home_search',
          component: HomeSearch,
          meta: {
            title: "Search"
          }
        },
        {
          path: 'category/:category',
          name: 'home_category',
          components: {
            default: HomeCategory,
            create: CreateEntity
          },
          meta: {
            title: "Category"
          }
        },
        {
          path: 'profile',
          name: 'home_profile',
          component: HomeProfile,
          meta: {
            title: "Preferences"
          }
        }
      ]
    },
    {
      path: '/',
      name: 'about_index',
      components: {
        default: () => import('./views/About.vue'),
        nav: NavsBasic
      }
    },
    {
      path: '/404',
      name: 'not_found',
      components: {
        default: () => import('./views/NotFound.vue'),
        nav: NavsBasic
      }
    },
    {
      path: '*', redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.login === true)) {
    if (store.getters.logged_in) {
      next()
      return
    }
    alert.status(UI_REQUIRE_AUTH)
    next({ name: 'auth_login' })
  }
  else if (to.matched.some(route => route.meta.login === false)) {
    if (!store.getters.logged_in) {
      next()
      return
    }
    alert.status(UI_ALREADY_AUTH)
    next({ name: 'home_index' })
  }
  else {
    next()
  }
})

export default router