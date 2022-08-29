import { ShopCreation } from '../../types/shop'

const URL = 'https://backend-online-shop-sla686.herokuapp.com/api/v1'
// const URL = 'http://localhost:4000/api/v1'

const create = async (
  params: { userId: string },
  credentials: { t: string },
  shop: ShopCreation
) => {
  try {
    const response = await fetch(`${URL}/shops/by/` + params.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
      body: shop,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const list = async (signal: AbortSignal) => {
  try {
    const response = await fetch(`${URL}/shops/`, {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const listByOwner = async (
  params: { userId: string },
  credentials: { t: string },
  signal: AbortSignal
) => {
  try {
    const response = await fetch(`${URL}/shops/by/` + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (params: { shopId: string }, signal: AbortSignal) => {
  try {
    const response = await fetch(`${URL}/shops/` + params.shopId, {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (
  params: { shopId: string },
  credentials: { t: string },
  shop: ShopCreation
) => {
  try {
    const response = await fetch(`${URL}/shops/` + params.shopId, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
      body: shop,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (
  params: { shopId: string },
  credentials: { t: string }
) => {
  try {
    const response = await fetch(`${URL}/shops/${params.shopId}`, {
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

export { create, list, listByOwner, read, update, remove }
