import express from 'express'
import AuthController from '../controllers/auth'

const router = express.Router()

//prettier-ignore
router.route('/signin')
  .post(AuthController.signin)

//prettier-ignore
router.route('/signout')
  .get(AuthController.signout)

export default router
