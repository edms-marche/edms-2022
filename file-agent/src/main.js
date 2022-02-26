import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './config/vuetify';
import i18n from './locale/i18n'
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import VueNotification from 'vue-notification'
import velocity from 'velocity-animate'

Vue.config.productionTip = false
Vue.use(VueFileAgent);
Vue.use(VueNotification, { velocity });

new Vue({
  VueFileAgent,
  VueFileAgentStyles,
  i18n,
  router,
  store,
  vuetify,
  created() {
    // 跳去 landing-page
    const initPage = localStorage.getItem('landing-page') === undefined ? 'jb5' : localStorage.getItem('landing-page');
    this.$router.push({ name: initPage });
  },
  render: h => h(App)
}).$mount('#app')
