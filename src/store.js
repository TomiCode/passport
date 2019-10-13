import Vue from 'vue'
import Vuex from 'vuex'

import { post } from "@/modules/requests";
import { API_AUTH_LOGIN } from "@/modules/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      token: localStorage.getItem('vinca:session') || null,
    },
    user: {
      name: "",
      email: "",
      avatar: ""
    }
  },
  mutations: {
    account_login (state, login) {
      localStorage.setItem('vinca:session', login.uuid)
      state.auth.token = login.uuid
      state.user.name = login.username
      state.user.email = login.email
      state.user.avatar = login.avatar
    },
    account_forget (state) {
      localStorage.removeItem('vinca:session')
      state.auth.token = null
    }
  },
  actions: {
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('account_forget')
        resolve()
      })
    }
  },
  getters: {
    logged_in: state => !!state.auth.token
  }
})
