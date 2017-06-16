import store from '../store'

export default router => {
  router.beforeEach((to, from, next) => {
    if (to.fullPath !== '/login' && !store.state.login.token) {
      next('/login')
    }
    next()
  })
}
