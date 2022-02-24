import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vnMessage from './vn.json'
import enMessage from './en.json'

Vue.use(VueI18n)

const messages = {
  vn: vnMessage,
  en: enMessage
}

const i18n = new VueI18n({
  locale: 'en',
  messages,
  fallbackLocale: 'vn',
  silentFallbackWarn: true
})

export default i18n