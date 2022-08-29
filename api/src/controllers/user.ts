import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'

// POST /users
const create = async (req: Request, res: Response, next: NextFunction) => {
  // Mongoose will first validate and then save the new user
  try {
    const { name, email, password, seller } = req.body
    const user = new User({
      name,
      email,
      password,
      seller,
    })

    await UserService.create(user)
    res.status(200).json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await UserService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
const findById = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await UserService.findById(req.params.userId))
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    })
  }
}

// PATCH /users/:userId
// BUG cannot use "mongoose.findByIdAndUpdate" method here because it doesn't call setters for virtual "password" field!
// Issue: https://github.com/Automattic/mongoose/issues/8804
// Possible fix in Mongoose 6.6+
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userUpdate = req.body
    userUpdate.updated = Date.now()
    const userId = req.params.userId

    await UserService.update(userId, userUpdate)

    // TEMPORARY SOLUTION ONLY! Manually insert password field to trigger setters!
    if (userUpdate.hasOwnProperty('password')) {
      const updatedUser = await UserService.findById(userId)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updatedUser.password = userUpdate.password
      await updatedUser.save()
    }
    res.status(200).json(await UserService.findById(userId))
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log(error)
      next(error)
    }
  }
}

// DELETE /users/:userId
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.remove(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /shops/by/:userId
const isSeller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await UserService.findById(req.params.userId)
    const isSeller = foundUser && foundUser.seller
    if (!isSeller) {
      return res.status(403).json({
        error: 'User is not a seller',
      })
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }

  next()
}

export default {
  create,
  findById,
  findAll,
  remove,
  update,
  isSeller,
}
