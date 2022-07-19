import Vue from 'vue'
import Vuex from 'vuex'
import eventsModule from './events'
import userModule from './user'
import userDataModule from './userData'
import registerEventsModule from './registerEvents'

Vue.use(Vuex)

export default new Vuex.Store({
 modules: {
   events: eventsModule,
   user: userModule,
   userData: userDataModule,
   registerEvents: registerEventsModule,
 }
})