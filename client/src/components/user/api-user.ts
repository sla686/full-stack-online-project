import { User } from '../../types/user'

const create = async (user: User) => {
  try {
    const response = await fetch(
      'https://backend-online-shop-sla686.herokuapp.com/api/v1/users/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    )
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const list = async (signal: AbortSignal) => {
  try {
    const response = await fetch(
      'https://backend-online-shop-sla686.herokuapp.com/api/v1/users/',
      {
        method: 'GET',
        signal: signal,
      }
    )
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
    const response = await fetch(
      'https://backend-online-shop-sla686.herokuapp.com/api/v1/users/' +
        params.userId,
      {
        method: 'GET',
        signal: signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t,
        },
      }
    )
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
    const response = await fetch(
      'https://backend-online-shop-sla686.herokuapp.com/api/v1/users/' +
        params.userId,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t,
        },
        body: JSON.stringify(user),
      }
    )
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
    const response = await fetch(
      'https://backend-online-shop-sla686.herokuapp.com/api/v1/users/' +
        params.userId,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t,
        },
      }
    )
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { create, list, read, update, remove }
