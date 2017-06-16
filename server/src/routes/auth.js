import passport from 'passport'
import jwt from 'jsonwebtoken'
import config from '../config'

export default (app) => {
  app.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
      const token = jwt.sign(req.user, config.jwtSecret)
      return res.send({auth: req.user, token})
    } else {
      return res.status(401).send({error: 'Error logging in!'})
    }
  })
}
