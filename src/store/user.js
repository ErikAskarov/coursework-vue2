import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null,
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.isAuthenticated = true
      state.user.uid = payload
    }
  },
  actions: {
    SIGNUP({ commit }, payload) {
      console.log(payload)
      commit('SET_PROCESSING', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('SET_USER', user.uid)
        commit('SET_PROCESSING', false)
      })
      .catch((error) => {
        commit('SET_PROCESSING', false)
        commit('SET_ERROR', error.message)
      })
    }
  },
  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated
  }
}