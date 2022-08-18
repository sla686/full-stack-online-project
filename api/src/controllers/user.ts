import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'

// POST /users
// prettier-ignore
export const createUser = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Mongoose will first validate and then save the new user
  try {
    const { name, email, password } = req.body
    const user = new User({
      name,
      email,
      password,
    })

    // await User.init()
    await UserService.create(user)
    res.json(user)
  }
  catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log('My error is here after user creation')
      next(error)
    }
  }
}

// GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log('My error is here after findAll')
      next(error)
    }
  }
}
