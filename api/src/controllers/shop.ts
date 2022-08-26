import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import { Request as RequestAuth } from 'express-jwt'
import { Fields, Files, formidable } from 'formidable'
import extend from 'lodash/extend'

import Shop from '../models/Shop'
import ShopService from '../services/shop'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
// import defaultImage from '../../client/public/images/default.png'

// interface RequestOwner extends Request, Document {
//   shop?: {
//     updated: number
//     image: Buffer
//     owner: {
//       _id: string
//     }
//   }
//   auth?: {
//     _id: string
//   }
// }

const create = async (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({ keepExtensions: true })
  form.parse(req, async (err, fields: Fields, files: Files) => {
    if (err) {
      res.status(400).json({
        message: 'Image could not be uploaded',
      })
    }
    const shop = new Shop(fields)
    try {
      const foundUser = await UserService.findById(req.params.userId)
      shop.owner = foundUser._id
      if (files.image) {
        console.log(files)
        if (files.image instanceof Array) {
          shop.image = fs.readFileSync(files.image[0].filepath)
          // shop.image.name =
          //   files.image[0].originalFilename || files.image[0].newFilename
          // shop.image.ContentType = files.image[0].type
        } else {
          shop.image = fs.readFileSync(files.image.filepath)
          // shop.image.name =
          //   files.image.originalFilename || files.image.newFilename
          // shop.image.ContentType = files.image.type
        }
      }
      const result = await ShopService.create(shop)
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        next(error)
      }
    }
  })
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await ShopService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const listByOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shops = await ShopService.findByOwner(req.params.userId)
    res.json(shops)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const readById = async (req: Request, res: Response) => {
  try {
    const shop = await ShopService.findById(req.params.shopId)
    if (!shop)
      return res.status(400).json({
        error: 'Shop not found',
      })
    shop.image = undefined
    return res.json(shop)
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve shop',
    })
  }
}

const isOwner = (req: RequestAuth, res: Response, next: NextFunction) => {
  console.log(req)
  const isOwner =
    req.body.shop && req.auth && req.body.shop.owner._id == req.auth._id
  if (!isOwner) {
    return res.status(403).json({
      error: 'User is not authorized',
    })
  }
  next()
}

const update = (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({ keepExtensions: true })
  form.parse(req, async (err, fields: Fields, files: Files) => {
    if (err) {
      res.status(400).json({
        message: 'Photo could not be uploaded',
      })
    }
    let shop = req.body.shop
    shop = extend(shop, fields)
    shop.updated = Date.now()
    if (files.image) {
      if (files.image instanceof Array) {
        shop.image = fs.readFileSync(files.image[0].filepath)
        // shop.image.contentType = files.image.type
      } else {
        shop.image = fs.readFileSync(files.image.filepath)
      }
    }
    try {
      const result = await shop.save()
      res.json(result)
    } catch (error) {
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        console.log(error)
        next(error)
      }
    }
  })
}

export default { create, findAll, listByOwner, readById, isOwner, update }
