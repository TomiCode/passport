import Vue from 'vue'
import Vuex from 'vuex'

import { request } from "@/modules/requests";
import { API_CONTAINER, API_CONTAINER_CREATE } from "@/modules/api";

import { generateKey, key } from "openpgp";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      token: localStorage.getItem('vinca:session') || null,
    },
    crypto: {
      certificate: null,
      private: null,
      open_private: null
    },
    user: {
      name: "",
      email: "",
      avatar: ""
    },
    stores: [ ]
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
      state.crypto.certificate = atob(container.certificate)
      state.crypto.private = atob(container.encrypted)
    },
    container_decrypt (state, keyobj) {
      state.crypto.open_private = keyobj
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
          passphrase: password,
          armor: false
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
    },
    container_decrypt({ commit, state }, password) {
      return new Promise(async (resolve, reject) => {
        var privkey = (await key.readArmored(state.crypto.private)).keys[0]
        if (await privkey.decrypt(password) == false) {
          console.log("invalid password")
          reject()
          return
        }
        commit('container_decrypt', privkey)
        resolve()
      })
    }
  },
  getters: {
    logged_in: state => !!state.auth.token,
    auth_token: state => state.auth.token,
    container_valid: state => !!state.crypto.private && !!state.crypto.certificate,
    container_decrypted: state => !!state.crypto.open_private
  }
})
