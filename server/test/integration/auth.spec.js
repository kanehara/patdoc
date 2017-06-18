import chaiHttp from 'chai-http'
import chai from 'chai'
import prepareMockServer from '../prepare-mock-server'
import logger from '../../src/logger'
import config from '../../src/config'

chai.use(chaiHttp)
chai.use(require('chai-datetime'))
const request = chai.request
const expect = chai.expect

describe('Auth', () => {
  let server
  before(async () => {
    try {
      server = await prepareMockServer()
    } catch (err) {
      logger.error(err)
    }
  })

  it('successful patient login returns user and token', async () => {
    const res = await request(server)
      .post(`/login`)
      .send({ emailAddress: 'morty@test.com', password: 'jessica' })
    expect(res).to.have.status(200)
    expect(res.body.auth.emailAddress).to.equal('morty@test.com')
    expect(res.body.auth.userType).to.equal(config.USER_TYPES.PATIENT)
    expect(res.body.token).to.be.ok
  })

  it('successful doctor login returns user and token', async () => {
    const res = await request(server)
      .post(`/login`)
      .send({ emailAddress: 'doc@test.com', password: 'marty' })
    expect(res).to.have.status(200)
    expect(res.body.auth.emailAddress).to.equal('doc@test.com')
    expect(res.body.auth.userType).to.equal(config.USER_TYPES.DOCTOR)
    expect(res.body.token).to.be.ok
  })

  it('invalid password returns 401', async () => {
    try {
      await request(server)
        .post(`/login`)
        .send({ emailAddress: 'doc@test.com', password: 'invalid' })
    } catch (err) {
      expect(err.response).to.have.status(401)
    }
  })

  it('invalid email returns 401', async () => {
    try {
      await request(server)
        .post(`/login`)
        .send({ emailAddress: 'invalid@test.com', password: 'marty' })
    } catch (err) {
      expect(err.response).to.have.status(401)
    }
  })
})
