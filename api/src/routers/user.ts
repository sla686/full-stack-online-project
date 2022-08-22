import express from 'express'

import UserController from '../controllers/user'
import AuthController from '../controllers/auth'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
// prettier-ignore
router.route('/')
  .get(UserController.findAll)
  .post(UserController.create)

// prettier-ignore
router
  .route('/:userId')
  .get(
    AuthController.requireSignin, 
    UserController.findById
  )
  .patch(
    AuthController.requireSignin,
    AuthController.hasAuthorization,
    UserController.update
  )
  .delete(
    AuthController.requireSignin,
    AuthController.hasAuthorization,
    UserController.remove
  )

export default router
