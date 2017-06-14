import express from 'express'
import bodyParser from 'body-parser'
import * as routes from './routes'

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
 * Health check endpoint
 */
app.get('/healthz', (req, res) => {
  res.send('Healthy as a horse')
})

routes.initAppointmentsRoutes(app)
routes.initMedicalRecordRoutes(app)
routes.initAuthRoutes(app)
routes.initDoctorRoutes(app)
routes.initPatientRoutes(app)

export default app
