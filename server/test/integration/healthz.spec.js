import chaiHttp from 'chai-http'
import chai from 'chai'
import prepareMockServer from '../prepare-mock-server'
import logger from '../../src/logger'

chai.use(chaiHttp)
const request = chai.request
const expect = chai.expect

describe('Health check', () => {
  let server
  before(async () => {
    try {
      server = await prepareMockServer()
    } catch (err) {
      logger.error(err)
    }
  })

  describe('200 response', () => {
    it('Health check returns 200 response', async () => {
      const res = await request(server)
        .get('/healthz')
      expect(res).to.have.status(200)
    })
  })
})
