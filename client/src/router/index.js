import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Appointments from '@/components/Appointments'
import MedicalRecord from '@/components/MedicalRecord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/profile',
      component: Profile
    }, {
      path: '/appointments',
      component: Appointments
    }, {
      path: '/medicalRecord',
      component: MedicalRecord
    }
  ]
})
