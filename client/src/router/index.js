import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Appointments from '@/components/Appointments'
import AppointmentList from '@/components/AppointmentList'
import NewAppointment from '@/components/NewAppointment'
import MedicalRecord from '@/components/MedicalRecord'
import MedicalRecordUpload from '@/components/MedicalRecordUpload'
import MedicalRecordGrid from '@/components/MedicalRecordGrid'
import PatientFrame from '@/components/PatientFrame'
import _400 from '@/components/_400'
import _401 from '@/components/_401'
import _403 from '@/components/_403'
import _404 from '@/components/_404'
import _500 from '@/components/_500'
import PatientSearch from '@/components/PatientSearch'
import Login from '@/components/Login'
import authGuard from './authGuard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/400',
      component: _400
    }, {
      path: '/401',
      component: _401
    }, {
      path: '/403',
      component: _403
    }, {
      path: '/404',
      component: _404
    }, {
      path: '/500',
      component: _500
    }, {
      path: '/search',
      component: PatientSearch
    }, {
      path: '/patients',
      component: PatientFrame,
      props: true,
      children: [
        {
          path: '',
          redirect: '/'
        }, {
          path: ':patientId',
          redirect: ':patientId/profile'
        }, {
          path: ':patientId/profile',
          component: Profile,
          props: true
        }, {
          path: ':patientId/appointments',
          component: Appointments,
          props: true,
          children: [
            {
              path: '',
              component: AppointmentList,
              props: true
            }, {
              path: 'new',
              component: NewAppointment,
              props: true
            }
          ]
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
    }, {
      path: '*',
      component: _404
    }
  ]
})

// Guard routes if user is not logged in
authGuard(router)

export default router
