export function initMedicalRecordRoutes (app) {
  app.post('/patients/:patientId/medicalRecord', ({ params: { patientId }, body }, res) => {
    console.log('hit')
    res.send(200)
  })

  app.delete('/patients/:patientId/medicalRecord/:medicalRecordId', ({ params: { patientId, medicalRecordId } }, res) => {
    console.log('hit')
    res.send(200)
  })
}
