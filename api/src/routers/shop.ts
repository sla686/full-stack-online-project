import express from 'express'

import UserController from '../controllers/user'
import AuthController from '../controllers/auth'
import ShopController from '../controllers/shop'

const router = express.Router()

//prettier-ignore
router.route('/')
  .get(ShopController.findAll)

//prettier-ignore
// router.route('/:shopId')
//   .get(ShopController.findById)

router
  .route('/by/:userId')
  .post(
    AuthController.requireSignin,
    AuthController.hasAuthorization,
    UserController.isSeller,
    ShopController.create
  )
// .get(
//   AuthController.requireSignin,
//   AuthController.hasAuthorization,
//   ShopController.listByOwner
// )

router
  .route('/:shopId')
  .patch(
    AuthController.requireSignin
    // ShopController.isOwner,
    // ShopController.update
  )
  .delete(
    AuthController.requireSignin
    // ShopController.isOwner,
    // ShopController.remove
  )

// prettier-ignore
// router
//   .route('/logo/:shopId')
//   .get(
//     ShopController.photo,
//     ShopController.defaultPhoto
//   )

//prettier-ignore
// router
//   .route('/defaultphoto')
//   .get(ShopController.defaultPhoto)

// router.param('shopId', ShopController.shopByID)

export default router
