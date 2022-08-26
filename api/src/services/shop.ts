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

const findById = async (userId: string): Promise<ShopDocument> => {
  const foundUser = await Shop.findById({ _id: userId }).populate(
    'owner',
    '_id name'
  )
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default { create, findAll, findByOwner, findById }
