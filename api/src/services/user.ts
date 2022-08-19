import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'
import mongoose from 'mongoose'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().select('name email updated created')
}

const findById = async (userId: string): Promise<UserDocument> => {
  let foundUser = null
  if (mongoose.Types.ObjectId.isValid(userId))
    foundUser = await User.findById(userId).select('name email updated created')

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findAll,
  findById,
}
