import { UserSignIn } from '../../types/user'

// const URL = 'https://backend-online-shop-sla686.herokuapp.com/api/v1'
const URL = 'http://localhost:4000/api/v1'

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
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const signout = async () => {
  try {
    const response = await fetch(`${URL}/auth/signout/`, { method: 'GET' })
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { signin, signout }
