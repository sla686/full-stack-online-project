import jwt from 'jsonwebtoken'
import { expressjwt, Request as RequestAuth } from 'express-jwt'
import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import { JWT_SECRET } from '../util/secrets'

const signin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })

    if (!user)
      return res.status(401).json({
        error: 'User not found',
      })

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({
        error: 'Email and password do not match.',
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET
    )

    res.cookie('t', token, {
      expires: new Date(Date.now() + 9999),
    })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        seller: user.seller,
      },
    })
  } catch (err) {
    return res.status(401).json({
      error: 'Could not sign in',
    })
  }
}

const signout = async (req: Request, res: Response) => {
  res.clearCookie('t')
  return res.status(200).json({
    message: 'signed out',
  })
}

const requireSignin = expressjwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
})

const hasAuthorization = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  // Authorized to only do PUT and DELETE on your own profile!
  const user = await UserService.findById(req.params.userId)
  const authorized = user && req.auth && user._id == req.auth._id
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized',
    })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization }
