import { Auth } from '../models'
import logger from '../logger'
import bcrypt from 'bcrypt'

export function initAuthRoutes (app) {
  app.post('/auth', ({body: { emailAddress, password }}, res) => {
    Auth.findOne({ emailAddress })
      .then(auth => {
        if (auth) {
          bcrypt.compare(password, auth._doc.password)
            .then(passMatch => {
              passMatch ? res.send(auth._doc.userType) : res.sendStatus(401)
            })
        } else {
          res.sendStatus(401)
        }
      })
      .catch(err => {
        logger.error(`Error getting patients with err: ${err}`)
        res.sendStatus(500)
      })
  })
}
