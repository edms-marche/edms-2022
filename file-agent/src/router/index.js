import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLayout from '@/views/HomeLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeLayout,
    children: [
      {
        name: 'plate',
        path: '/plate',
        alias: '/',
        component: () => import(/* webpackChunkName: "plate_page" */ '@/views/PlatePage')
      }, {
        name: 'film',
        path: '/film',
        component: () => import(/* webpackChunkName: "film_page" */ '@/views/FilmPage')
      }
    ]
  }, {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login_page" */ '@/views/LoginPage')
  }, {
    name: 'reset',
    path: '/reset',
    component: () => import(/* webpackChunkName: "reset_page" */ '@/views/ResetPage')
  }
]

const router = new VueRouter({
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  //? comment out this for hash mode
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

export default router
