import Vue from 'vue'
import Vuex from 'vuex'

import { generateKey, key } from "openpgp";
import {
  request,
  API_AUTH_LOGIN,
  API_CONTAINER,
  API_CONTAINER_CREATE,
  API_CATEGORY_CREATE,
  API_NO_CONTAINER,
  API_AUTH_SESSION
} from "@/modules/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      token: localStorage.getItem('vinca:session') || null,
      container: null
    },
    openpgp: {
      public: null,
      private: null,
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
      if (categories !== null && categories !== undefined) {
        state.categories = categories.categories
      }
    },
    local_container_update: (state, container) => {
      state.auth.container = container
    },

    account_login (state, account) {
      if (account.uuid !== undefined) {
        localStorage.setItem('vinca:session', account.uuid)
        state.auth.token = account.uuid
      }
      state.user.name = account.username
      state.user.email = account.email
      state.user.avatar = account.avatar
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
    api_login: ({ commit, dispatch }, { email, password }) => new Promise((resolve, reject) => {
      request.do(API_AUTH_LOGIN, { data: { email, password }})
        .then(res => {
          commit('account_login', res.content)
          dispatch('api_load_container')
            .then(() => resolve())
            .catch(reason => reject(reason))
        })
        .catch(reason => reject(reason))
    }),
    api_auth_session: ({ commit, dispatch }) => new Promise((resolve, reject) => {
      request.do(API_AUTH_SESSION)
        .then(res => {
          commit('account_login', res.content)
          dispatch('api_load_container')
            .then(() => resolve())
            .catch(reason => reject(reason))
        })
        .catch(reason => reject(reason))
    }),
    api_load_container: ({ commit, dispatch }) => new Promise((resolve, reject) => {
      request.do(API_CONTAINER)
        .then(res => {
          commit('local_container_update', res.content.id)
          if (res.content.id !== -1) {
            dispatch('prepare_keystore', {
              certificate: atob(res.content.certificate),
              encrypted: atob(res.content.encrypted)
            })
            commit('local_categories_update', { categories: res.content.categories })
          }
          resolve(res.content)
        })
        .catch(err => reject(err.status))
    }),
    api_create_container: ({ commit, dispatch, state }, { password }) => new Promise((resolve, reject) => {
      generateKey({
        userIds: [{ name: state.user.name, email: state.user.email }],
        rsaBits: 4096,
        passphrase: password,
        armor: false
      })
        .then(keystore => request.do(API_CONTAINER_CREATE, {
          data: {
            certificate: btoa(keystore.publicKeyArmored),
            encrypted: btoa(keystore.privateKeyArmored)
          }
        }))
        .then(res => {
          commit('local_container_update', res.content.id)
          dispatch('prepare_keystore', {
            certificate: atob(res.content.certificate),
            encrypted: atob(res.content.encrypted)
          })
          commit('local_categories_update', {
            categories: res.content.categories
          })
          resolve(res)
        })
        .catch(reason => reject(reason))
    }),
    prepare_keystore: ({ commit }, { certificate, encrypted }) => {
      key.readArmored(certificate)
        .then(store => {
          commit('keystore_setup', { certificate: store.keys[0], key: encrypted })
        })
        .catch(err => {
          console.error("Error while public certificate read:", err)
        })
    },
    decrypt_private: ({ commit, state }, { password }) => new Promise((resolve, reject) => {
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
            commit('categories_update', response.content.categories)
            resolve()
          })
          .catch(() => reject())
      })
    }
  },
  getters: {
    no_container: state => state.auth.container == -1,
    private_decrypted: state => state.openpgp.private instanceof key.Key,
    private_loaded: state => !!state.openpgp.private,
    has_categories: state => state.categories && !!state.categories.length,
    categories: state => state.categories || [ ],

    logged_in: state => !!state.auth.token,
    auth_token: state => state.auth.token,
    container_valid: state => !!state.crypto.private && !!state.crypto.certificate,
    container_decrypted: state => !!state.crypto.open_private
  }
})
