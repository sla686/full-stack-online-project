import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import { Fields, Files, formidable } from 'formidable'
// import extend from 'lodash/extend'

import Shop from '../models/Shop'
import ShopService from '../services/shop'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
// import defaultImage from '../../client/public/images/default.png'

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
    const shops = await ShopService.findByOwner(req.params.userId,
    )
    res.json(shops)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export default { create, findAll, listByOwner }
