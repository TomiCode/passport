import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

import { generateKey, key, message, decrypt, encrypt } from "openpgp";
import {
  request,
  API_AUTH_LOGIN,
  API_CONTAINER,
  API_CONTAINER_CREATE,
  API_AUTH_SESSION,
  API_STORES,
  API_STORE_CREATE,
  API_STORE_SEARCH,
  API_STORE_DELETE,
  API_STORE,
  API_CATEGORY,
  API_CATEGORY_DELETE,
  API_USER_HOME,
  API_USER_UPDATE
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
        dark_mode: false,
        last_used: true
      }
    },
    categories: [ ],
    first_steps: {
      forced: false,
      visible: false
    },
    content_loading: false
  },
  mutations: {
    keystore_setup: (state, { certificate, key }) => {
      state.openpgp.public = certificate
      state.openpgp.private = key
    },
    local_private_update: (state, key) => state.openpgp.private = key,
    local_categories_update: (state, categories) => {
      if (categories !== null && categories !== undefined) {
        state.categories = categories.categories
      }
    },
    local_container_update: (state, container) => state.auth.container = container,
    first_steps_force: (state) => {
      if (!state.first_steps.forced) {
        state.first_steps.forced = true
        state.first_steps.visible = true
      }
    },
    first_steps_visible: (state, visible) => state.first_steps.visible = visible,
    api_content_loading: (state, value) => state.content_loading = value,
    api_remove_category: (state, category) => {
      state.categories.splice(state.categories.findIndex(c => c.id === category.id), 1)
    },
    api_account_login: (state, uuid) => {
      if (uuid !== undefined) {
        localStorage.setItem('vinca:session', uuid)
        state.auth.token = uuid
      }
    },
    api_account_update: (state, account) => {
      state.user.name = account.username
      state.user.email = account.email
      state.user.avatar = account.avatar
      state.user.preferences.dark_mode = account.dark_mode
      state.user.preferences.last_used = account.last_used
    },
    api_account_forget: (state) => {
      localStorage.removeItem('vinca:session')
      state.openpgp.private = null
      state.auth.token = null
    }
  },
  actions: {
    api_login: ({ commit, dispatch }, { email, password }) => new Promise((resolve, reject) => {
      request.do(API_AUTH_LOGIN, { data: { email, password }})
        .then(res => {
          commit('api_account_login', res.content.uuid)
          commit('api_account_update', res.content)
          dispatch('api_load_container')
            .then(() => resolve())
            .catch(reason => reject(reason))
        })
        .catch(reason => reject(reason))
    }),
    api_auth_session: ({ commit, dispatch }) => new Promise((resolve, reject) => {
      request.do(API_AUTH_SESSION)
        .then(res => {
          commit('api_account_login', res.content.uuid)
          commit('api_account_update', res.content)
          dispatch('api_load_container')
            .then(() => resolve())
            .catch(reason => reject(reason))
        })
        .catch(reason => reject(reason))
    }),
    api_user_update: ({ commit }, { confirmation, properties }) => new Promise((resolve, reject) => {
      request.do(API_USER_UPDATE, {
        data: {
          confirmation,
          email: properties.email,
          password: properties.password,
          ...properties.preferences
        }
      })
      .then(res => {
        commit('api_account_update', res.content)
        resolve(res)
      })
      .catch(reason => reject(reason))
    }),
    api_load_home: ({ commit }) => new Promise((resolve, reject) => {
      commit('api_content_loading', true)
      _.delay(() => {
        request.do(API_USER_HOME)
          .then(res => resolve(res))
          .catch(reason => reject(reason))
          .finally(() => commit('api_content_loading', false))
      }, 256)
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
        .then(keystore => request.do(API_CONTAINER, {
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
    api_create_store: ({ commit, dispatch }, { store }) => new Promise((resolve, reject) => {
      commit('api_content_loading', true)
      dispatch('encrypt_store', { store })
        .then(store => request.do(API_STORE_CREATE, { data: { ...store }}))
        .then(res => resolve(res))
        .catch(reason => reject(reason))
        .finally(() => commit('api_content_loading', false))
    }),
    api_load_category: ({ commit }, { category }) => new Promise((resolve, reject) => {
      commit('api_content_loading', true)
      _.delay(() => {
        request.do(API_STORES, { data: { category }})
          .then(res => resolve(res))
          .catch(reason => reject(reason))
          .finally(() => _.delay(() => commit('api_content_loading', false), 128))
      }, 256)
    }),
    api_create_category: ({ commit }, { category }) => new Promise((resolve, reject) => {
      request.do(API_CATEGORY, { data: category, method: "POST" })
        .then(res =>  {
          commit('local_categories_update', {
            categories: res.content.categories
          })
          resolve(res)
        })
        .catch(reason => reject(reason))
    }),
    api_update_category: ({ }, { category }) => new Promise((resolve, reject) => {
      request.do(API_CATEGORY, { data: category, method: "PATCH" })
        .then(res => resolve(res))
        .catch(reason => reject(reason))
    }),
    api_delete_category: ({ commit }, { category, migrate }) => new Promise((resolve, reject) => {
      commit('api_content_loading', true)
      request.do(API_CATEGORY_DELETE, { data: { id: category.id, migrate }})
        .then(res => {
          if (res.content.removed !== undefined) {
            commit('api_remove_category', category)
          }
          resolve(res)
        })
        .catch(reason => reject(reason))
        .finally(() => commit('api_content_loading', false))
    }),
    api_load_store: ({ commit, dispatch }, { store }) => new Promise((resolve, reject) => {
      commit('api_content_loading', true)
      request.do(API_STORE, { data: { store_id: store }})
        .then(res => dispatch('decrypt_store', { store: res.content }))
        .then(store => resolve(store))
        .catch(reason => reject(reason))
        .finally(() => commit('api_content_loading', false))
    }),
    api_search_store: ({ commit }, { query }) => new Promise((resolve, reject) => {
      commit('api_content_loading', true)
      _.delay(() => {
        request.do(API_STORE_SEARCH, { data: { query }})
          .then(res => resolve(res))
          .catch(reason => reject(reason))
          .finally(() => _.delay(() => commit('api_content_loading', false), 128))
      }, 256)
    }),
    api_update_store: ({ commit, dispatch }, { store }) => new Promise((resolve, reject) => {
      commit('api_content_loading', true)
      dispatch('encrypt_store', { store })
        .then(store => request.do(API_STORE, { data: { ...store }, method: "PATCH" }))
        .then(res => resolve(res))
        .catch(reason => reject(reason))
        .finally(() => commit('api_content_loading', false))
    }),
    api_delete_store: ({ commit }, { store }) => new Promise((resolve, reject) => {
      commit('api_content_loading', true)
      request.do(API_STORE_DELETE, { data: { id: store.id }})
        .then(res => resolve(res))
        .catch(reason => reject(reason))
        .finally(() => commit('api_content_loading', false))
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
    encrypt_store: ({ state }, { store }) => new Promise((resolve, reject) => {
      encrypt({
        message: message.fromText(JSON.stringify(store.content)),
        publicKeys: state.openpgp.public,
        armor: false
      })
        .then(cipher => resolve({
          ...store,
          content: btoa(String.fromCharCode.apply(null, cipher.message.packets.write()))
        }))
        .catch(reason => reject(reason))
    }),
    decrypt_store: ({ state }, { store }) => new Promise((resolve, reject) => {
      message.read(Uint8Array.from(atob(store.content), c => c.charCodeAt(0)))
        .then(message => decrypt({
          message: message,
          privateKeys: state.openpgp.private,
          armor: false
        }))
        .then(str => resolve({ ...store, content: JSON.parse(str.data) }))
        .catch(reason => reject(reason))
    }),
    logout: ({ commit }) => new Promise((resolve) => {
      commit('api_account_forget')
      resolve()
    }),
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
