import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Appointments from '@/components/Appointments'
import MedicalRecord from '@/components/MedicalRecord'
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
          path: ':id',
          redirect: ':id/profile'
        }, {
          path: ':id/profile',
          component: Profile
        }, {
          path: ':id/appointments',
          component: Appointments
        }, {
          path: ':id/medicalRecord',
          component: MedicalRecord
        }
      ]
    }
  ]
})
