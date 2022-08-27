import { ProductCreation } from '../../types/product'

const URL = 'http://localhost:4000/api/v1'

const create = async (
  params: { shopId: string },
  credentials: { t: string },
  product: ProductCreation
) => {
  try {
    const response = await fetch(`${URL}/api/products/by/` + params.shopId, {
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

export { create }
