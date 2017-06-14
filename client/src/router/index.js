import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Appointments from '@/components/Appointments'
import MedicalRecord from '@/components/MedicalRecord'
import MedicalRecordUpload from '@/components/MedicalRecordUpload'
import MedicalRecordGrid from '@/components/MedicalRecordGrid'
import Home from '@/components/Home'
import PatientFrame from '@/components/PatientFrame'
import _400 from '@components/_400'
import _404 from '@components/_404'
import _500 from '@components/_500'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    }, {
      path: '/400',
      component: _400
    }, {
      path: '/404',
      component: _404
    }, {
      path: '/500',
      component: _500
    }, {
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
