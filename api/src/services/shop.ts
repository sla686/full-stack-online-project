import mongoose from 'mongoose'

import Shop, { ShopDocument } from '../models/Shop'
import { NotFoundError, BadRequestError } from '../helpers/apiError'

const create = async (shop: ShopDocument): Promise<ShopDocument> => {
  return await shop.save()
}

const findAll = async (): Promise<ShopDocument[]> => {
  return await Shop.find()
}

export default { create, findAll }
