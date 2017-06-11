import express from 'express'
import { initAppointmentsRoutes } from './routes'

const app = express()

/**
 * Allow CORS
 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

/**
 * Health check endpoint
 */
app.get('/healthz', (req, res) => {
  res.send('Healthy as a horse')
})

initAppointmentsRoutes(app)

export default app
