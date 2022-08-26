import mongoose from 'mongoose'

import Shop, { ShopDocument } from '../models/Shop'
import { NotFoundError, BadRequestError } from '../helpers/apiError'

const create = async (shop: ShopDocument): Promise<ShopDocument> => {
  return await shop.save()
}

const findAll = async (): Promise<ShopDocument[]> => {
  return await Shop.find()
}

const findByOwner = async (userId: string): Promise<ShopDocument[]> => {
  return await Shop.find({ owner: userId }).populate('owner', '_id name')
}

export default { create, findAll, findByOwner }
