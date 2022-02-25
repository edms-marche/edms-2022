import Vue from 'vue'
import VueI18n from 'vue-i18n'
import hkMessage from './hk.json'
import enMessage from './en.json'
import cnMessage from './cn.json'

Vue.use(VueI18n)

const messages = {
  hk: hkMessage,
  en: enMessage,
  cn: cnMessage
}

const i18n = new VueI18n({
  locale: 'en',
  messages,
  fallbackLocale: 'hk',
  silentFallbackWarn: true
})

export default i18n
