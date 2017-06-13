import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Appointments from '@/components/Appointments'
import MedicalRecord from '@/components/MedicalRecord'
import MedicalRecordUpload from '@/components/MedicalRecordUpload'
import MedicalRecordGrid from '@/components/MedicalRecordGrid'
import Home from '@/components/Home'
import PatientFrame from '@/components/PatientFrame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/patients',
      component: PatientFrame,
      children: [
        {
          path: '',
          redirect: '/'
        }, {
          path: ':patientId',
          redirect: ':patientId/profile'
        }, {
          path: ':patientId/profile',
          component: Profile
        }, {
          path: ':patientId/appointments',
          component: Appointments,
          props: true
        }, {
          path: ':patientId/medicalRecord',
          component: MedicalRecord,
          props: true,
          children: [
            {
              path: '',
              component: MedicalRecordGrid,
              props: true
            }, {
              path: 'upload',
              component: MedicalRecordUpload,
              props: true
            }
          ]
        }
      ]
    }
  ]
})
