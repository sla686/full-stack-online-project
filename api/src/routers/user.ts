import express from 'express'

import { createUser, findAll } from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
// prettier-ignore
router
  .route('/')
  .get(findAll)
  .post(createUser)

// prettier-ignore
// router
//   .route('/:userId')
//   .get(findById)
//   .put(updateUser)
//   .delete(deleteUser)

export default router
