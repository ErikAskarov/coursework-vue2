import Vue from 'vue'
import Vuex from 'vuex'
import { subscribe, getOneToMaster, getOneToWorker, getDocument, updateConfirm } from '../http/registerEventAPI'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    registerEvents: [],
    userRegisterEvents: [],
    masterRegisterEvents: [],
    userPdfFile: []
  },
  mutations: {
    SET_SUBSCRIBE(state, payload) {
      state.registerEvents.push(payload)
    },
    SET_MASTER_REGISTER_EVENTS(state, payload) {
      Vue.set(state, 'masterRegisterEvents', payload)
    },
    SET_USER_REGISTER_EVENTS(state, payload) {
      Vue.set(state, 'userRegisterEvents', payload)
    },
    SET_PDF_NAME(state, payload) {
      Vue.set(state, 'userPdfFile', payload)
    },
    SET_UPDATE_USER_REGISTER_EVENTS(state, payload) {
      console.log('SET_UPDATE_USER_REGISTER_EVENTS mutations', payload.id)
      let id = state.masterRegisterEvents.findIndex(item => item.id == payload.id)
      console.log('find id', id)
      state.masterRegisterEvents[id].confirm = payload.confirm
    }
  },
  actions: {
    async SUBSCRIBE_USER({ commit }, payload) {
      await subscribe(payload).then((data) => {
        console.log('mId:', payload.workerId)
        console.log('Записан:', data)
        commit('SET_SUBSCRIBE', payload)
      }).catch((error) => {
        console.log(error)
        console.log('Не записан', error.message)
      })
    },

    DOWNLOAD_DOCUMENT({ commit }, payload) {
      console.log('DD', payload)
      
      getDocument(payload).then((data) => {
        console.log('Документ скачивается', data)
        commit('SET_PDF_NAME', data)
      }).catch((error) => {
        console.log('Download document', error.message)
      })
    },

    LOAD_MASTER_REGISTER_EVENTS({ commit }, payload) {
      console.log('LOAD_MASTER_REGISTER_EVENTS работает')
      getOneToMaster(payload).then((data) => {
        console.log('master register events', data)
        commit('SET_MASTER_REGISTER_EVENTS', data)
      }).catch((error) => {
        console.log('LOAD_MASTER_REGISTER_EVENTS:', error.message)
      })
    },

    LOAD_WORKER_REGISTER_EVENTS({ commit }, payload) {
      console.log('LOAD_WORKER_REGISTER_EVENTS работает')
      getOneToWorker(payload).then((data) => {
        console.log('worker register events', data)
        commit('SET_USER_REGISTER_EVENTS', data)
        console.log('1')
      }).catch((error) => {
        console.log('LOAD_WORKER_REGISTER_EVENTS:', error.message)
      })
    },

    UPDATE_CONFIRM({ commit }, payload) {
      console.log('UPDATE_CONFIRM', payload)
      updateConfirm(payload).then((data) => {
        console.log('update confirm vuex data', data)
        commit('SET_UPDATE_USER_REGISTER_EVENTS', data)
        console.log('2')
      }).catch((error) => {
        console.log('UPDATE_CONFIRM error', error.message)
      })
    }
  },
  getters: {
    getMasterRegisterEvents: (state) => state.masterRegisterEvents,
    getUserRegisterEvents: (state) => state.userRegisterEvents
  }
}