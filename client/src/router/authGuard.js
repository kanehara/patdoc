import store from '../store'
import config from '@/config'

export default router => {
  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!store.state.login.token
    if (to.fullPath !== '/login' && !isAuthenticated) {
      // Redirect to login page if user is not authenticated
      return next('/login')
    } else if (to.fullPath === '/login' && isAuthenticated) {
      // Redirect to landing page for user depending on user type
      // Doctors go to /search
      // Patients go to their profile
      const userType = store.state.login.userType
      switch (userType) {
        case config.USER_TYPES.DOCTOR:
          return next('/search')
        case config.USER_TYPES.PATIENT:
          const patientId = store.state.login.userId
          return next(`/patients/${patientId}/profile`)
        default:
          console.error(`Invalid user type: ${userType}`)
      }
    }
    next()
  })
}
