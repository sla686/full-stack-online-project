import express from 'express'

import {
  createMovie,
  findById,
  deleteMovie,
  findAll,
  updateMovie,
} from '../controllers/movie'

const router = express.Router()

// Every path we define here will get /api/v1/ prefix
// prettier-ignore
router
  .route('/')
  .get(findAll)
  .post(createMovie)

// prettier-ignore
router
  .route('/:movieId')
  .get(findById)
  .put(updateMovie)
  .delete(deleteMovie)

export default router
