import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  // ??? Needed for unique index validation to work
  // await User.init()
  return user.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().select('name email updated created')
}

export default {
  create,
  findAll,
}
