import app from './app'
import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import logger from './logger'

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000'
app.set('port', port)

/**
 * Logger
 */
app.use(morgan('combined', {stream: logger.stream}))

/**
 * Body parser
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => logger.info('Express server listening on %d', port))
