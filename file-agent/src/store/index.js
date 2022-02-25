import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist/dist/umd'
import user from "./modules/user";
import auth from "./modules/auth";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production";

const vuexPersist = new VuexPersist({
  key: 'app-store',
  storage: window.localStorage,
  reducer: state => ({
    app_locale: state.app_locale
  })
})

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    app_locale: 'en',
  },
  getters: {
  },
  mutations: {
    SET_APP_LOCALE (state, payload) {
      state.app_locale = payload
    },
  },
  actions: {
  },
  modules: {
    user,
    auth
  },
  strict: debug
})
