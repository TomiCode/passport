import Vue from 'vue'
import Vuex from 'vuex'

import { generateKey, key } from "openpgp";
import {
  request,
  API_CONTAINER,
  API_CONTAINER_CREATE,
  API_CATEGORY_CREATE,
  API_NO_CONTAINER
} from "@/modules/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      token: localStorage.getItem('vinca:session') || null,
      container: null
    },
    openpgp: {
      server: false,
      public: null,
      private: null,
    },
    crypto: {
      certificate: null,
      private: null,
      open_private: null,
      container: 0
    },
    user: {
      name: "",
      email: "",
      avatar: "",
      preferences: {
        darkmode: false,
        lastused: true
      }
    },
    stores: [ ],
    categories: [ ]
  },
  mutations: {
    keystore_setup: (state, { certificate, key }) => {
      state.openpgp.public = certificate
      state.openpgp.private = key
    },
    local_private_update: (state, key) => {
      state.openpgp.private = key
    },
    local_categories_update: (state, categories) => {
      state.categories = categories
    },

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
      state.crypto.container = container.id
    },
    container_decrypt (state, keyobj) {
      state.crypto.open_private = keyobj
    },
    categories_update (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    api_load_container: ({ commit, dispatch }) => new Promise((resolve, reject) => {
      request.do(API_CONTAINER)
        .then(res => {
          dispatch('prepare_keystore', {
            certificate: atob(res.certificate), encrypted: atob(res.encrypted)
          })
          commit('local_categories_update', { categories: res.categories })
          resolve(res)
        })
        .catch(err => reject(err.status))
    }),
    prepare_keystore: ({ commit }, { certificate, encrypted }) => {
      key.readArmored(certificate)
        .then(certificate => {
          commit('keystore_setup', { certificate, key: encrypted })
        })
        .catch(err => {
          console.error("Error while public certificate read:", err)
        })
    },
    local_decrypt_private: ({ commit, state }, { password }) => new Promise((resolve, reject) => {
      key.readArmored(state.openpgp.private)
        .then(({ keys }) => {
          keys[0].decrypt(password)
            .then(res => {
              commit('local_private_update', keys[0])
              resolve(res)
            })
            .catch(reason => reject(reason))
        })
        .catch(reason => reject(reason))
    }),

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
              commit('categories_update', resp.categories)
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
    },
    category_create({ commit }, category) {
      return new Promise((resolve, reject) => {
        request.do(API_CATEGORY_CREATE, { data: category })
          .then(response => {
            commit('categories_update', response.categories)
            resolve()
          })
          .catch(() => reject())
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
