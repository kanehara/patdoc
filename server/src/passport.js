import { Auth, Doctor, Patient } from './models'
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import config from './config'
import logger from './logger'

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
    const result = await Auth.findOne({ emailAddress })
    if (!result || !result._doc) {
      return done(null, false)
    }

    const auth = result._doc
    // Check password
    const isEqual = await bcrypt.compare(password, auth.password)
    if (!isEqual) {
      return done(null, false)
    }

    // Return user info
    if (auth.userType === config.USER_TYPES.DOCTOR) {
      const result = await Doctor.findOne({ emailAddress: auth.emailAddress })
      const doctor = result._doc
      doctor.userType = config.USER_TYPES.DOCTOR
      return done(null, doctor)
    } else if (auth.userType === config.USER_TYPES.PATIENT) {
      const result = await Patient.findOne({ emailAddress: auth.emailAddress })
      const patient = result._doc
      patient.userType = config.USER_TYPES.PATIENT
      return done(null, patient)
    } else {
      logger.error(`Invalid user type found in auth table: ${auth.userType}`)
      return done(null, false)
    }
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
