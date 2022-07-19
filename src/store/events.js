import Vue from 'vue'
import Vuex from 'vuex'
import { create, getAll, getOne } from '../http/eventsAPI'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    events: [],
  },
  mutations: {
    SET_EVENT(state, payload) {
      state.events.push(payload)
    },
    SET_EVENTS(state, payload) {
      Vue.set(state, 'events', payload)
    }
  },
  actions: {
    GET_EVENT(payload) {
      getOne(payload).then((payload) => {
        console.log('Event:', payload)
      }).catch((error) => {
        console.log(error.message)
      })
    },
    GET_EVENTS({ commit }) {
      getAll().then((payload) => {
        console.log('Events:', payload)
        commit('SET_EVENTS', payload)
      }).catch((error) => {
        console.log(error.message)
      })
    },
    SET_EVENT({ commit }, payload) {
      create(payload).then((data) => {
        console.log('успех', data)
        commit('SET_EVENT', payload)
      }).catch((error) => {
        console.log('неудача', error.message)
      })
    },

  },
  getters: {
    getEvents: (state) => state.events
  }
}