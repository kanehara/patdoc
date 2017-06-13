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
      mkdirp(filePath, err => {
        if (err) {
          logger.error(`Could not create directory '${filePath}' due to error: ${err}`)
        } else {
          cb(null, filePath)
        }
      })
    }
  },
  filename (req, { originalname }, cb) {
    cb(null, originalname)
  }
})

const upload = multer({ storage })

async function readDirectory (path) {
  const p = new Promise((resolve, reject) => {
    fs.readdir(path, (err, fileNames) => {
      if (err) {
        reject(err)
      }
      resolve(fileNames)
    })
  })
  return p
}

async function buildMedicalRecordResponse (patientId) {
  try {
    const response = []
    const filePath = `${PATH_PREFIX}/${patientId}/medicalRecord`
    const medicalRecordIds = await readDirectory(filePath)
    for (let i = 0; i < medicalRecordIds.length; ++i) {
      const medicalRecordId = medicalRecordIds[i]
      const fileNames = await readDirectory(`${filePath}/${medicalRecordId}`)
      // There should only be one file per medical record ID
      const filename = fileNames[0]
      const url = `file://${filePath}/${medicalRecordId}/${filename}`
      const fileStats = fs.statSync(url)
      const size = `${Math.round(fileStats.size / 1000)} KB`
      const medicalRecordResponse = {
        id: medicalRecordIds[i],
        filename,
        url,
        size
      }
      response.push(medicalRecordResponse)
    }
    return response
  } catch (err) {
    logger.warn(`Error trying to build medical record response with error: ${err}`)
    throw err
  }
}

export function initMedicalRecordRoutes (app) {
  app.post('/patients/:patientId/medicalRecord', upload.single('file'), (req, res) => {
    res.send({
      location: `file://${req.file.destination}`,
      id: req.medicalRecordId
    })
  })

  app.get('/patients/:patientId/medicalRecord', ({ params: { patientId } }, res) => {
    buildMedicalRecordResponse(patientId)
      .then(response => res.send(response))
      .catch(() => res.sendStatus(404))
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
