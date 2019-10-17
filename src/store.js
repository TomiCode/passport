import Vue from 'vue'
import Vuex from 'vuex'

import { request } from "@/modules/requests";
import { API_CONTAINER, API_CONTAINER_CREATE } from "@/modules/api";

import { generateKey } from "openpgp";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      token: localStorage.getItem('vinca:session') || null,
    },
    keystore: {
      certificate: null,
      private: null,
      decrypted: false
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
    },
    container_fetch (state, container) {
      state.keystore.certificate = container.certificate
      state.keystore.private = container.encrypted
    }
  },
  actions: {
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('account_forget')
        resolve()
      })
    },
    fetch_container({ commit }) {
      return new Promise((resolve, reject) => {
        request.do(API_CONTAINER)
          .then(resp => {
            if (resp.valid === true) {
              commit('container_fetch', resp)
            }
            resolve(resp.valid)
          })
          .catch(reason => reject(reason))
      })
    },
    create_container({ commit, state }, password) {
      return new Promise((resolve, reject) => {
        generateKey({
          userIds: [{ name: state.user.name, email: state.user.email }],
          rsaBits: 4096,
          passphrase: password
        })
          .then(key => {
            request.do(API_CONTAINER_CREATE, {
              data: {
                encrypted: btoa(key.privateKeyArmored),
                certificate: btoa(key.publicKeyArmored)
            }})
              .then(resp => {
                commit('container_fetch', resp)
                resolve()
              })
          })
          .catch((reason) => reject(reason))
      })
    }
  },
  getters: {
    logged_in: state => !!state.auth.token,
    auth_token: state => state.auth.token,
    container_valid: state => !!state.keystore.private && !!state.keystore.certificate
  }
})
