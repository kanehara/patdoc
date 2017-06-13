import multer from 'multer'
import uuid from 'uuid/v1'
import mkdirp from 'mkdirp'
import fs from 'fs'
import logger from '../logger'

const PATH_PREFIX = '/tmp/patdoc/patients'

const storage = multer.diskStorage({
  destination (req, file, cb) {
    const id = uuid()
    req.medicalRecordId = id
    const filePath = `${PATH_PREFIX}/${req.params.patientId}/medicalRecord/${id}`
    if (!fs.existsSync(filePath)) {
      mkdirp.sync(filePath)
    }
    cb(null, filePath)
  },
  filename (req, { originalname }, cb) {
    cb(null, originalname)
  }
})

const upload = multer({ storage })

export function initMedicalRecordRoutes (app) {
  app.post('/patients/:patientId/medicalRecord', upload.single('file'), (req, res) => {
    res.send({
      location: `file://${req.file.destination}`,
      id: req.medicalRecordId
    })
  })

  app.delete('/patients/:patientId/medicalRecord/:medicalRecordId', ({ params: { patientId, medicalRecordId } }, res) => {
    fs.unlink(`${PATH_PREFIX}/${patientId}/medicalRecord/${medicalRecordId}`, (err) => {
      if (err) {
        logger.warn(`Error deleting medical record file with id: ${medicalRecordId} for patient with id: ${patientId} with error: ${err}`)
        res.send(500)
      } else {
        res.send(200)
      }
    })
  })
}
