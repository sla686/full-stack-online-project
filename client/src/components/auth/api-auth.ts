import { UserSignIn } from '../../types/user'

const URL = 'https://backend-online-shop-sla686.netlify.app/api/v1'
// const URL = 'http://localhost:4000/api/v1'

const signin = async (user: UserSignIn) => {
  try {
    const response = await fetch(`${URL}/auth/signin/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const signout = async () => {
  try {
    const response = await fetch(`${URL}/auth/signout/`, { method: 'GET' })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { signin, signout }
