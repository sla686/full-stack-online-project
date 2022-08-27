import { Request, Response, NextFunction } from 'express'
import extend from 'lodash/extend'
import { Fields, Files, formidable } from 'formidable'
import fs from 'fs'

import Product from '../models/Product'
import { BadRequestError } from '../helpers/apiError'
import ProductService from '../services/product'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({ keepExtensions: true })
  form.parse(req, async (err, fields: Fields, files: Files) => {
    if (err) {
      return res.status(400).json({
        message: 'Image could not be uploaded',
      })
    }
    const product = new Product(fields)
    try {
      const foundShop = await ProductService.findById(req.params.productId)
      product.shop = foundShop._id
      if (files.image) {
        if (files.image instanceof Array) {
          product.image = fs.readFileSync(files.image[0].filepath)
        } else {
          product.image = fs.readFileSync(files.image.filepath)
        }
      }
      const result = await ProductService.create(product)
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

const productByID = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (!product)
      return res.status(400).json({
        error: 'Product not found',
      })
    return res.json(product)
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve product',
    })
  }
}

export default {
  create,
  productByID,
}
