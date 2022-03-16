import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from '@firebase/app-compat'
import 'firebase/compat/auth'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBciG1G40bU16TcAo5gBim3r8fIRywRwVs",
  authDomain: "ikea-db.firebaseapp.com",
  projectId: "ikea-db",
  storageBucket: "ikea-db.appspot.com",
  messagingSenderId: "188614452623",
  appId: "1:188614452623:web:3affa737848de8958f97fa"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export { storage }