import express from 'express'
import bodyParser from 'body-parser'
import initRoutes from './routes'
import passport from 'passport'
// Initialize passport settings
require('./passport')

const app = express()

/**
 * Body parser
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Allow's
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control')
  next()
})

/**
 * Passport init
 */
app.use(passport.initialize())
app.use(passport.session())

/**
 * Health check endpoint
 */
app.get('/healthz', (req, res) => {
  res.send('Healthy as a horse')
})

initRoutes(app)

export default app
