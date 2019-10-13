export function post(url, data) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(resp => resolve(resp))
    .catch(reason => reject(reason))
  })
}
