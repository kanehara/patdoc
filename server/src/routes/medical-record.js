import multer from 'multer'
import uuid from 'uuid/v1'
import mkdirp from 'mkdirp'
import fs from 'fs'

const storage = multer.diskStorage({
  destination (req, file, cb) {
    const id = uuid()
    req.medicalRecordId = id
    const filePath = `/tmp/patdoc/patients/${req.params.patientId}/medicalRecord/${id}`
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
    console.log('hit')
    res.sendStatus(200)
  })
}
