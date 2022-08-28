import { Request, Response, NextFunction } from 'express'
import extend from 'lodash/extend'
import { Fields, Files, formidable } from 'formidable'
import fs from 'fs'

import Product from '../models/Product'
import { BadRequestError } from '../helpers/apiError'
import ProductService from '../services/product'
import ShopService from '../services/shop'

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
      const foundShop = await ShopService.findById(req.params.shopId)
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

const readById = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.findById(req.params.productId)
    if (!product)
      return res.status(400).json({
        error: 'Product not found',
      })
    product.image = undefined
    return res.status(200).json(product)
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve product',
    })
  }
}

const listByShop = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.findByShop(req.params.shopId)
    res.status(200).json(products)
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve product',
    })
  }
}

const listLatest = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.listLatest()
    res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve products',
    })
  }
}

const listRelated = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.findById(req.params.productId)
    const products = await ProductService.listRelated(product)
    res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve products',
    })
  }
}

const update = (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({ keepExtensions: true })
  form.parse(req, async (err, fields: Fields, files: Files) => {
    if (err) {
      return res.status(400).json({
        message: 'Photo could not be uploaded',
      })
    }
    let product = await ProductService.findById(req.params.productId)
    product = extend(product, fields)
    product.updated = Date.now()
    if (files.image) {
      if (files.image instanceof Array) {
        product.image = fs.readFileSync(files.image[0].filepath)
      } else {
        product.image = fs.readFileSync(files.image.filepath)
      }
    }
    try {
      const result = await product.save()
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

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await ProductService.remove(req.params.productId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log(error)
      next(error)
    }
  }
}

const listCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductService.listCategories()
    res.json(products)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log(error)
      next(error)
    }
  }
}

interface query {
  name?: object
  category?: string
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const query: query = {}

  if (req?.query?.search)
    query.name = { $regex: req.query.search, $options: 'i' }
  if (req?.query?.category && req?.query?.category != 'All')
    query.category = req.query.category.toString()

  try {
    const products = await ProductService.findByQuery(query)
    res.json(products)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log(error)
      next(error)
    }
  }
}

const photo = async (req: Request, res: Response, next: NextFunction) => {
  const product = await ProductService.findById(req.params.productId)
  if (product && product?.image) {
    // res.set('Content-Type', req.product.image.contentType)
    return res.status(200).send(product.image)
  }
  next()
}

const defaultPhoto = (req: Request, res: Response) => {
  return res.status(200).sendFile(process.cwd() + '/src/images/default.png')
}

export default {
  create,
  update,
  remove,
  readById,
  listByShop,
  photo,
  defaultPhoto,
  listLatest,
  listRelated,
  listCategories,
  findAll,
}
