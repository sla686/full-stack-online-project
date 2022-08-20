import express from 'express'

import {
  createUser,
  findAll,
  findById,
  updateUser,
  deleteUser,
} from '../controllers/user'

import { requireSignin, hasAuthorization } from '../controllers/auth'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
// prettier-ignore
router
  .route('/')
  .get(findAll)
  .post(createUser)

// prettier-ignore
router
  .route('/:userId')
  .get(requireSignin, findById)
  .put(requireSignin, hasAuthorization, updateUser)
  .delete(requireSignin, hasAuthorization, deleteUser)

export default router
