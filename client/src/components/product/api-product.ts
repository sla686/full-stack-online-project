import { ProductCreation } from '../../types/product'

const URL = 'http://localhost:4000/api/v1'

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

export { create, listByShop, listLatest, listRelated }
