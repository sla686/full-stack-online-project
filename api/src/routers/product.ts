import express from 'express'

import ProductController from '../controllers/product'
import AuthController from '../controllers/auth'
import ShopController from '../controllers/shop'

const router = express.Router()

router
  .route('/by/:shopId')
  .get(ProductController.listByShop)
  .post(
    AuthController.requireSignin,
    ShopController.isOwner,
    ProductController.create
  )

export default router
