import mongoose from 'mongoose'

import Shop, { ShopDocument } from '../models/Shop'
import { NotFoundError, BadRequestError } from '../helpers/apiError'

const create = async (shop: ShopDocument): Promise<ShopDocument> => {
  return await shop.save()
}

export default { create }
