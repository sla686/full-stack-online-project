import express from 'express'
import { signin, signout } from '../controllers/auth'

const router = express.Router()

//prettier-ignore
router.route('/signin')
  .post(signin)

//prettier-ignore
router.route('/signout')
  .get(signout)

export default router
