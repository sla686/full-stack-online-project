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

// This is for the product suggestions, better user experience!
// prettier-ignore
router
  .route('/latest')
  .get(ProductController.listLatest)

// This is for the product suggestions, better user experience!
// prettier-ignore
router
  .route('/related/:productId')
  .get(ProductController.listRelated)

// prettier-ignore
router
  .route('/:productId')
  .get(ProductController.readById)

// prettier-ignore
router
  .route('/image/:productId')
  .get(
    ProductController.photo,
    ProductController.defaultPhoto
  )

//prettier-ignore
router
  .route('/defaultphoto')
  .get(ProductController.defaultPhoto)

export default router
