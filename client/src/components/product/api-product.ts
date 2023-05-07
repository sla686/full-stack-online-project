import { ProductCreation } from '../../types/product'
import queryString from 'query-string'

const URL = 'https://backend-online-shop-sla686.up.railway.app/api/v1'

const create = async (
  params: { shopId: string },
  credentials: { t: string },
  product: ProductCreation
) => {
  try {
    const response = await fetch(`${URL}/products/by/` + params.shopId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
      body: product,
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listByShop = async (params: { shopId: string }, signal: AbortSignal) => {
  try {
    const response = await fetch(`${URL}/products/by/` + params.shopId, {
      method: 'GET',
      signal: signal,
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listLatest = async (signal: AbortSignal) => {
  try {
    const response = await fetch(`${URL}/products/latest`, {
      method: 'GET',
      signal: signal,
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listRelated = async (
  params: { productId: string },
  signal: AbortSignal
) => {
  try {
    const response = await fetch(
      `${URL}/products/related/` + params.productId,
      {
        method: 'GET',
        signal: signal,
      }
    )
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (params: { productId: string }, signal: AbortSignal) => {
  try {
    const response = await fetch(`${URL}/products/` + params.productId, {
      method: 'GET',
      signal: signal,
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (
  params: { shopId: string; productId: string },
  credentials: { t: string },
  product: ProductCreation
) => {
  try {
    const response = await fetch(
      `${URL}/products/` + params.shopId + '/' + params.productId,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + credentials.t,
        },
        body: product,
      }
    )
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (
  params: { shopId: string; productId: string },
  credentials: { t: string }
) => {
  try {
    const response = await fetch(
      `${URL}/products/` + params.shopId + '/' + params.productId,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t,
        },
      }
    )
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listSearch = async (params: object) => {
  const query = queryString.stringify(params)
  try {
    const response = await fetch(`${URL}/products?` + query, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listCategories = async (signal: AbortSignal) => {
  try {
    const response = await fetch(`${URL}/products/categories`, {
      method: 'GET',
      signal: signal,
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  create,
  listByShop,
  listLatest,
  listRelated,
  read,
  update,
  remove,
  listSearch,
  listCategories,
}
