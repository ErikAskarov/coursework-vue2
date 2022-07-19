import {getOne} from '../http/userAPI'
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    userData: null,
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      Vue.set(state, 'userData', payload)
    },
  },
  actions: {
    LOAD_USER_DATA({commit}, payload) {
      getOne(payload).then((data) => {
        console.log('2', data)
        commit('SET_USER_DATA', data)
      })
    }
  },
  getters: {
    userData: (state) => state.userData
  }
}