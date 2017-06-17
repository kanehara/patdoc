import connect from '../../db'
import logger from '../../logger'
import mongoose from 'mongoose'
import load from './load'
const connection = mongoose.connection

connect()

connection.once('open', () => {
  initDb()
    .then(() => {
      logger.info('Successfully initialized DB')
      process.exit()
    })
    .catch(err => {
      logger.error('Error initializing DB: ', err)
      process.exit()
    })
})
connection.on('error', (err) => {
  logger.error('Error in Mongo connection:', err)
  process.exit()
})

async function initDb () {
  return load()
}
