import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import logger from './logger'

const app = express()

app.use(morgan('combined', {stream: logger.stream}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Health check endpoint
 */
app.get('/healthz', (req, res) => {
  res.send('Healthy as a horse')
})

export default app
