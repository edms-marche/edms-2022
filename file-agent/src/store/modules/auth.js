//* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_SUBSCRIBE_FCM } from "../actions/auth";
import { USER_REQUEST } from "../actions/user";

import axios from 'axios';

const _BaseURL = "https://rest.directoutput.com.hk/api";   //* 唔同 api 就改

const state = {
  token: localStorage.getItem("user-jwt-token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  /**
   * AUTH_REQUEST：去 server 攞個 jwt token
   */
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    window.console.log("AUTH_REQUEST: ", user);

    return new Promise((resolve, reject) => {                     // The Promise used for router redirect in login
      commit(AUTH_REQUEST);

      const url = `${_BaseURL}/token/${user.username}/${user.password}/20300701000000/`;  //? Expiry Date 唔可以太耐，2046 係唔得嘅

      axios({url: url, method: 'GET' })
        .then(resp => {
          const token = resp.data                                 // retrive the token from the response

          window.console.log("Token: ", token);

          localStorage.setItem("user-jwt-token", token);              // store the auth token
          localStorage.setItem("login-name", user.username);      // store the login name
          //localStorage.setItem("login-password", user.password);  // store the login password 取消

          axios.defaults.headers.common['Authorization'] = `Bearer "${token}"`;   // set the header of axios to the token value

          commit(AUTH_SUCCESS, resp);
          
          dispatch(USER_REQUEST);                                 // you have your token, now log in your user :)
          resolve(resp);
        })
        .catch( err => {
          commit( AUTH_ERROR, err );
          localStorage.removeItem("user-jwt-token");
          localStorage.removeItem("login-name");
          localStorage.removeItem("login-password");
          reject( err );
        });
    });
  },

  /**
   * AUTH_LOGOUT：
   */
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-jwt-token");
      localStorage.removeItem("login-name");
      localStorage.removeItem("login-password");
      resolve();
    });
  },

  /**
   * AUTH_REGISTER_FCM：通知 server 我要收 FCM
   */
  [AUTH_SUBSCRIBE_FCM]: ({ commit, dispatch }, user) => {
    window.console.log("AUTH_SUBSCRIBE_FCM: ", user);

    return new Promise((resolve, reject) => {                     // The Promise used for router redirect in login
      commit(AUTH_SUBSCRIBE_FCM);

      const url = `${_BaseURL}/easyrip/subscribe/`;
      const data = {
        FCM: {
          Token: localStorage.getItem('user-fcm-token')
        },
        DeviceInfo: {
          Id: localStorage.getItem('device-id'),
          Model: localStorage.getItem('device-model'),
          Platform: localStorage.getItem('device-platform'),
          Version: localStorage.getItem('device-version'),
        }
      };
      const header = {
        "Authorization" : `Bearer ${localStorage.getItem('user-jwt-token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      };

      axios.post(url, data, { headers: header} )
        .then((resp) => {
          const result = resp.data[0];

          window.console.log('Subscribed: ', result);

          commit(AUTH_SUCCESS, resp);

          dispatch(USER_REQUEST);
          resolve(resp);
        })
        .catch( err => {
          window.console.log('Subscribe failed: ', err);
          commit( AUTH_ERROR, err );
          //? anything you want to do on error
          reject( err );
        });

    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.data;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  },
  [AUTH_SUBSCRIBE_FCM]: state => {
    state.status = "subscribing";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
