import chaiHttp from 'chai-http'
import chai from 'chai'
import prepareMockServer from '../prepare-mock-server'
import logger from '../../src/logger'

chai.use(chaiHttp)
chai.use(require('chai-datetime'))
const request = chai.request
const expect = chai.expect

describe('Doctor', () => {
  let server
  before(async () => {
    try {
      server = await prepareMockServer()
    } catch (err) {
      logger.error(err)
    }
  })

  it('Gets all doctors', async () => {
    const response = await request(server)
      .get('/doctors')
    expect(response).to.have.status(200)
    expect(response.body.find(d => d.emailAddress === 'doc@test.com')).to.be.ok
    expect(response.body.find(d => d.emailAddress === 'sanchez@test.com')).to.be.ok
    expect(response.body.find(d => d.emailAddress === 'hans@test.com')).to.be.ok
  })
})
