import multer from 'multer'
import uuid from 'uuid/v1'
import mkdirp from 'mkdirp'
import fs from 'fs'
import logger from '../logger'

const PATH_PREFIX = '/tmp/patdoc/patients'

const storage = multer.diskStorage({
  destination (req, file, cb) {
    const id = uuid()
    req.fileId = id
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
    const fileIds = await readDirectory(filePath)
    for (let i = 0; i < fileIds.length; ++i) {
      const fileId = fileIds[i]
      const fileNames = await readDirectory(`${filePath}/${fileId}`)
      // There should only be one file per medical record ID
      const filename = fileNames[0]
      const path = `${filePath}/${fileId}/${filename}`
      const fileStats = fs.statSync(path)
      const size = `${Math.round(fileStats.size / 1000)} KB`
      const url = `file://${path}`
      const medicalRecordResponse = {
        id: fileIds[i],
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

export default app => {
  app.post('/patients/:patientId/medicalRecord', upload.single('file'), (req, res) => {
    return res.send({
      location: `file://${req.file.destination}`,
      id: req.fileId
    })
  })

  app.get('/patients/:patientId/medicalRecord', async ({ params: { patientId } }, res) => {
    try {
      const response = await buildMedicalRecordResponse(patientId)
      return res.send(response)
    } catch (err) {
      return res.sendStatus(404)
    }
  })

  app.delete('/patients/:patientId/medicalRecord/:fileId', ({ params: { patientId, fileId } }, res) => {
    fs.unlink(`${PATH_PREFIX}/${patientId}/medicalRecord/${fileId}`, (err) => {
      if (err) {
        logger.warn(`Error deleting medical record file with id: ${fileId} for patient with id: ${patientId} with error: ${err}`)
        return res.send(500)
      } else {
        return res.send(200)
      }
    })
  })
}
