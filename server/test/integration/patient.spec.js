import chaiHttp from 'chai-http'
import chai from 'chai'
import prepareMockServer from '../prepare-mock-server'
import logger from '../../src/logger'

chai.use(chaiHttp)
const request = chai.request
const expect = chai.expect

describe('Patients', () => {
  let server
  before(async () => {
    try {
      server = await prepareMockServer()
    } catch (err) {
      logger.error(err)
    }
  })

  it('GET to retrieve all patients', async () => {
    const res = await request(server)
      .get('/patients')
    expect(res).to.have.status(200)
    expect(res.body.find(p => p.emailAddress === 'pencilvester@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'morty@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'rick@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'beth@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'jerry@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'birdperson@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'summer@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'gearhead@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'watert@test.com')).to.be.ok
    expect(res.body.find(p => p.emailAddress === 'tammy@test.com')).to.be.ok
  })

  it('GET to retrieve a single patient', async () => {
    const allRes = await request(server)
      .get('/patients')
    const singleRes = await request(server)
      .get(`/patients/${allRes.body[0]._id}`)
    expect(singleRes).to.have.status(200)
    expect(singleRes.body[0]).to.deep.equal(allRes.body[0])
  })

  it('returns 500 when trying to GET non existent user', async () => {
    try {
      await request(server)
        .get('/patients/invalid')
    } catch (err) {
      expect(err.response).to.have.status(500)
    }
  })
})
