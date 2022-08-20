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
    foundUser = await User.findById(userId, 'name email updated created')

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  let foundUser = null
  if (mongoose.Types.ObjectId.isValid(userId)) {
    // BUG: The method doesn't call setter for virtual 'password' field
    // Issue: https://github.com/Automattic/mongoose/issues/8804
    // Possible fix in Mongoose 6.6+
    // I'm doing additional steps in the controller file
    foundUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
      select: 'name email updated created',
    })
  }
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const remove = async (userId: string): Promise<UserDocument | null> => {
  let foundUser = null
  if (mongoose.Types.ObjectId.isValid(userId)) {
    foundUser = User.findByIdAndDelete(userId)
  }
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findAll,
  findById,
  update,
  remove,
}
