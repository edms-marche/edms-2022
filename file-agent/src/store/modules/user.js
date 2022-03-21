import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

import axios from 'axios';

const _BaseURL = "https://rest.marche.com.hk/api";   //* 唔同 api 就改

const state = { status: "", profile: {} };

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
};

const actions = {
  /**
   * USER_REQUEST: 去 server 攞個 user record 返嚟
   */
  [USER_REQUEST]: ({ commit, dispatch }) => {

    return new Promise((resolve, reject) => {

      commit(USER_REQUEST);

      const url = `${_BaseURL}/user/`;
      window.console.log("Auth: ", axios.defaults.headers.common['Authorization']);
      
      axios({url: url, method: 'GET' })
        .then(resp => {
          commit(USER_SUCCESS, resp);

          window.console.log("User: ", resp.data.Alias, resp.data.UserRoleName)
          localStorage.setItem("user-alias", resp.data.Alias);
          localStorage.setItem("user-role", resp.data.UserRoleName);

          resolve(resp);
        })
        .catch((err) => {
          commit(USER_ERROR);
          
          dispatch(AUTH_LOGOUT);      // 不能認證，登出用戶

          reject(err);
        });
    });
  },
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp);
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
