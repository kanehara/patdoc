import { Auth } from './models'
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import config from './config'

// Passport user deserialize methods
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser(async (id, done) => {
  let auth = null
  try {
    auth = await Auth.findById(id)
    done(null, auth)
  } catch (e) {
    done(e, false)
  }
})

// use LocalStrategy
passport.use(new LocalStrategy({usernameField: 'emailAddress'}, async (emailAddress, password, done) => {
  try {
    // Find user
    const auth = await Auth.findOne({ emailAddress })
    if (!auth) {
      return done(null, false)
    }

    // Check password
    const isEqual = await bcrypt.compare(password, auth._doc.password)
    if (!isEqual) {
      return done(null, false)
    }

    // Return user info
    const user = {
      _id: auth._doc._id,
      emailAddress: auth._doc.emailAddress,
      userType: auth._doc.userType
    }
    return done(null, user)
  } catch (e) {
    done(e, false)
  }
}))

// use JWTStrategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: config.jwtSecret
}
passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const auth = await Auth.findById(payload.id)

    if (!auth) {
      return done(null, false)
    }
    // return user if successful
    done(null, auth)
  } catch (e) {
    done(e, false)
  }
}))
