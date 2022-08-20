import express from 'express'
// import lusca from 'lusca' will be used later
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import userRouter from './routers/user'
import authRouter from './routers/auth'
import shopRouter from './routers/shop'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Set up routers
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/shops', shopRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
