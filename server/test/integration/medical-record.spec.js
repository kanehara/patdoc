import chaiHttp from 'chai-http'
import chai from 'chai'
import prepareMockServer from '../prepare-mock-server'
import logger from '../../src/logger'
import fs from 'fs'
import config from '../../src/config'
import path from 'path'

chai.use(chaiHttp)
const request = chai.request
const expect = chai.expect

describe('Medical records ', () => {
  let server
  before(async () => {
    try {
      server = await prepareMockServer()
    } catch (err) {
      logger.error(err)
    }
  })

  it('I can create a file, get it, delete it, and no longer get it', async () => {
    const postRes = await request(server)
      .post(`/patients/123/medicalRecord`)
      .attach('file', fs.readFileSync(__filename), 'medical-record.spec.js')
    expect(postRes).to.have.status(200)
    expect(postRes.body.id).to.be.ok
    expect(postRes.body.url).to.equal(`file://${config.MEDICAL_RECORD_PATH_PREFIX}/123/medicalRecord/${postRes.body.id}/${path.basename(__filename)}`)

    const getRes = await request(server)
      .get('/patients/123/medicalRecord')
    expect(getRes).to.have.status(200)
    expect(getRes.body.find(f => f.id === postRes.body.id)).to.deep.equal(postRes.body)

    const delRes = await request(server)
      .delete(`/patients/123/medicalRecord/${postRes.body.id}`)
    expect(delRes).to.have.status(200)

    const getRes2 = await request(server)
      .get('/patients/123/medicalRecord')
    expect(getRes2.body.find(f => f.id === postRes.body.id)).to.be.undefined
  })

  it('returns 404 for trying to GET non existent file', async () => {
    try {
      await request(server).get(`/patients/invalid/medicalRecord`)
    } catch (err) {
      expect(err.response).to.have.status(404)
    }
  })

  it('returns 404 for trying to DELETE non existent user\'s files', async () => {
    try {
      await request(server).delete(`/patients/invalid/medicalRecord`)
    } catch (err) {
      expect(err.response).to.have.status(404)
    }
  })

  it('returns 500 for trying to DELETE non existent file', async () => {
    try {
      await request(server).delete(`/patients/123/medicalRecord/invalid`)
    } catch (err) {
      expect(err.response).to.have.status(500)
    }
  })
})
