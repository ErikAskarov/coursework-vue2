import Vue from 'vue'
import Vuex from 'vuex'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from '../main'

Vue.use(Vuex)

export default {
  state: {
    events: [],
  },
  mutations: {
    GET_EVENTS(state, payload) {
      Vue.set(state, 'events', payload)
    }
  },
  actions: {
     async getEvents({ commit }) {
      let events = []
      const docRef = await collection(db, 'events')
      getDocs(docRef).then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData)
        })
      }).then(() => {
        commit('GET_EVENTS', events)
      })

      this.events = events;
    },
    async setEvents({ dispatch }, payload) {
      const docRef = await doc(db, 'events', payload.start)
      await setDoc(docRef, {
        name: payload.name,
        details: payload.details,
        start: payload.start,
        end: payload.end,
      }).then(() => {
          dispatch('getEvents')
      }) 
    }
  },
  getters: {
    getEvents: (state) => state.events
  }
}