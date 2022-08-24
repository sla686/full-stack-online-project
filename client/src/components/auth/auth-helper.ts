import { signout } from './api-auth'

const auth = {
  authenticate(jwt: string, cb: any) {
    if (typeof window !== 'undefined')
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },

  isAuthenticated() {
    if (typeof window == 'undefined') return false
    const item = sessionStorage.getItem('jwt')
    return item ? JSON.parse(item) : false
  },

  clearJWT(cb: any) {
    if (typeof window !== 'undefined') sessionStorage.removeItem('jwt')
    cb()
    signout().then(() => {
      document.cookie = 't=; expires=Thu, 01 Jan 1970 UTC; path=/;'
    })
  },
}

export default auth
