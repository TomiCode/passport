// Server entry points
export const API_AUTH_LOGIN = "api/v1/auth/login"
export const API_AUTH_RESET = "api/v1/auth/reset"
export const API_AUTH_REGISTER = "api/v1/auth/register"
export const API_AUTH_SESSION = "api/v1/auth/session"
export const API_CONTAINER = "api/v1/home/container"
export const API_CONTAINER_CREATE = "api/v1/home/container/create"
export const API_CATEGORIES = "api/v1/home/categories"
export const API_CATEGORY = "api/v1/home/category"
export const API_CATEGORY_CREATE = "api/v1/home/category/create"
export const API_CATEGORY_DELETE = "api/v1/home/category/delete"
export const API_STORE_CREATE = "api/v1/home/store/create"
export const API_STORE_DELETE = "api/v1/home/store/delete"
export const API_STORE = "api/v1/home/store"
export const API_STORE_SEARCH = "api/v1/home/store/search"
export const API_STORES = "api/v1/home/stores"
export const API_USER_HOME = "api/v1/home"
export const API_USER_UPDATE = "api/v1/home/preferences"

// Error constants
export const API_SUCCESS = "success"
export const API_AUTH_ERR = "user_login_invalid"
export const API_INVALID_SESSION = "user_session_invalid"
export const API_NO_CONTAINER = "user_no_container"

export const APP_NETWORK_ERR = "app_network_err"
export const API_FATAL_ERR = "fetch_err"

// Request handler
export const request = {
  config: {
    errorHandlers: { },
    authToken: () => null,
    absoluteUri: uri => process.env.VUE_APP_BACKEND + uri
  },
  handleError(err, reason) {
    if (this.config.errorHandlers[err] !== undefined) {
      this.config.errorHandlers[err](reason)
    }
  },
  handlers: {
    credentials: (auth) => auth ? { 'Vinca-Authentication' : auth } : { }
  },
  do(url, { data, type, method } = {}) {
    return new Promise((resolve, reject) => {
      fetch(this.config.absoluteUri(url), {
        method: method || (data ? 'POST' : 'GET'),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': type || 'application/json',
          ...this.handlers.credentials(this.config.authToken())
        },
        redirect: 'error',
        referrer: 'no-referrer',
        body: data ? JSON.stringify(data) : null
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.status !== API_SUCCESS) {
            if (this.config.errorHandlers[resp.status] !== undefined) {
              this.config.errorHandlers[resp.status](resp)
            }
            console.log("API error occurred, response:", resp)
            reject(resp)
            return
          }
          resolve(resp)
        })
        .catch(reason => {
          console.log(reason)
          if (reason instanceof TypeError) {
            this.handleError(APP_NETWORK_ERR, reason)
            reject({ status: APP_NETWORK_ERR })
            return
          }
          this.handleError(API_FATAL_ERR, reason)
          console.log("Fatal fetch error:", reason)
          reject({ status: API_FATAL_ERR })
        })
    })
  },
}