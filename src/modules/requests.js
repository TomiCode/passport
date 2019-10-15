export const API_AUTH_ERR = "user_no_auth"

export const request = {
  config: {
    onErrorHandlers: [ ],
    onAuthErrorHandlers: [ ],
    authToken: () => null
  },
  handlers: {
    credentials: (auth) => auth ? { 'Vinca-Authentication' : auth } : { }
  },
  do(url, { data, type, method,  }) {
    return new Promise((resolve, reject) => {
      console.log(data)
      fetch(url, {
        method: method || 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': type || 'application/json',
          ...this.handlers.credentials()
        },
        redirect: 'error',
        referrer: 'no-referrer',
        body: data ? JSON.stringify(data) : null
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.status == API_AUTH_ERR) {
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