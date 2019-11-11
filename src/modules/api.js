// Server entry points
export const API_AUTH_LOGIN = "api/v1/auth/login"
export const API_AUTH_REGISTER = "api/v1/auth/register"
export const API_CONTAINER = "api/v1/home/container"
export const API_CONTAINER_CREATE = "api/v1/home/container/create"
export const API_CATEGORIES = "api/v1/home/categories"
export const API_CATEGORY = "api/v1/home/category"
export const API_CATEGORY_CREATE = "api/v1/home/category/create"
export const API_STORE_CREATE = "api/v1/home/store/create"
export const API_STORES = "api/v1/home/stores"

// Error constants
export const API_AUTH_ERR = "user_no_auth"
export const API_INVALID_SESSION = "user_session_invalid"

// Request handler
export const request = {
  config: {
    onErrorHandlers: [ ],
    onAuthErrorHandlers: [ ],
    authToken: () => null,
    absoluteUri: uri => process.env.VUE_APP_BACKEND + uri
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
          if (resp.status == API_INVALID_SESSION) {
            this.config.onAuthErrorHandlers.forEach(handler => handler())
            return
          }
          resolve(resp)
        })
        .catch(reason => {
          console.log("error at internal fetch", reason)
          this.config.onErrorHandlers.forEach(handler => handler(reason))
          reject(reason)
        })
    })
  }
}