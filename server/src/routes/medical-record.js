let idCounter = 1

export function initMedicalRecordRoutes (app) {
  app.post('/patients/:patientId/medicalRecord', ({ params: { patientId }, body }, res) => {
    console.log('hit')
    res.send({location: 'hello', id: idCounter++})
  })

  app.delete('/patients/:patientId/medicalRecord/:medicalRecordId', ({ params: { patientId, medicalRecordId } }, res) => {
    console.log('hit')
    res.sendStatus(200)
  })
}
