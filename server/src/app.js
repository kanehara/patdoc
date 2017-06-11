import express from 'express'
import { initAppointmentsRoutes } from './routes'

const app = express()

/**
 * Health check endpoint
 */
app.get('/healthz', (req, res) => {
  res.send('Healthy as a horse')
})

initAppointmentsRoutes(app)

export default app
