/* eslint-disable no-console */
/**
 * 參考：https://medium.com/js-dojo/vuejs-pwa-cache-busting-8d09edd22a31
 */
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      window.console.log(
        'Site is ready.\n' +
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      window.console.log('Service worker has been registered.')
    },
    cached () {
      window.console.log('Content has been cached for offline use.')
    },
    updatefound () {
      //參考：https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#skip_waiting
      window.console.log('New content is downloading.')
      const newSW = register.installing;

      window.console.log('State: ', newSW.state);
    },
    updated () {
      window.console.log('New content is available; Refresh...')
      setTimeout(() => {
        window.location.reload(true)
      }, 1000)
    },
    offline () {
      window.console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      window.console.error('Error during service worker registration:', error)
    }
  })
}
