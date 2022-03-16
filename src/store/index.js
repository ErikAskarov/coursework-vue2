import Vue from 'vue'
import Vuex from 'vuex'
import generalModule from './general'
import eventsModule from './events'
import userModule from './user'

Vue.use(Vuex)

export default new Vuex.Store({
 modules: {
   generalModule,
   eventsModule,
   userModule,
 }
})