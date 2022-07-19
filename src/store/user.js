import { registration, login, check, getTable } from '../http/userAPI'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    user: {
      isAuthenticated: false,
      id: null,
      email: null,
      role: null,
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.isAuthenticated = true
      state.user.id = payload.id
      state.user.email = payload.email
      state.user.role = payload.role
    },
    UNSET_USER(state) {
      state.user.isAuthenticated = false
      state.user.id = null
      state.user.email = null
      state.user.role = null
    },
    SET_TABLE() {
      console.log('дата возвращена')
    }
  },
  actions: {
    SIGN_UP({ commit }, payload) {
      console.log(payload)
      registration({
        secondName: payload.secondName,
        firstName: payload.firstName,
        patronymic: payload.patronymic,
        email: payload.email,
        password: payload.password,
        cardpassId: payload.cardpassId,
        role: payload.role
      }).then((data) => {
        console.log('Успех!', data)
        commit('SET_USER', data)
      }).catch((error) => {
        console.log('Неудача', error.message)
      })
    },

    SIGN_IN({commit}, payload) {
      console.log('sign in', payload)
      login({
        email: payload.email,
        password: payload.password
      }).then((data) => {
        commit('SET_USER', data)
        console.log('Вы вошли', data.id)
      }).catch((error) => {
        console.log('Вы не вошли', error.message)
      })
    },
    CHECK_AUTH_USER({ dispatch }) {
      check().then((data) => {
        console.log('check auth user', data)
        dispatch('STATE_USER_CHANGED', data)
      }).catch((error) => {
        console.log('error check auth user', error.message)
      })
    },
    STATE_USER_CHANGED({ commit, dispatch }, payload) {
      console.log('state user changed', payload)
      if (payload) {
        commit('SET_USER', payload)
        dispatch('userData/LOAD_USER_DATA', payload.id, { root: true })
      }
      else {
        commit('UNSET_USER')
      }
    },

    SIGN_OUT({ commit }) {
      commit('UNSET_USER')
      localStorage.removeItem('token')
    },

    async GET_TABLE({ commit }, payload) {
      try {
        const dataFromDB = await getTable(payload)
        commit('SET_TABLE')
        return dataFromDB
      } catch (error) {
        console.log('get table error', error.message)
      }

    }
  },
  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated
  }
}