import { User, UserCreation } from '../../types/user'

const URL = 'https://backend-online-shop-sla686.up.railway.app/api/v1'

const create = async (user: UserCreation) => {
  console.log('body:', JSON.stringify(user))
  try {
    const response = await fetch(`${URL}/users/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const list = async (signal: AbortSignal) => {
  try {
    const response = await fetch(`${URL}/users/`, {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (
  params: { userId: string },
  credentials: { t: string },
  signal: AbortSignal
) => {
  try {
    const response = await fetch(`${URL}/users/${params.userId}`, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (
  params: { userId: string },
  credentials: { t: string },
  user: User
) => {
  try {
    const response = await fetch(`${URL}/users/${params.userId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
      body: JSON.stringify(user),
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (
  params: { userId: string },
  credentials: { t: string }
) => {
  try {
    const response = await fetch(`${URL}/users/${params.userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { create, list, read, update, remove }
