import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import axios from "axios";
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import { i18n } from '@/plugins/i18n';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

var firebaseConfig = {
  apiKey: "AIzaSyC8llhsv619JUleTIgnw05rDsa293H10Hg",
  authDomain: "swartz-b3579.firebaseapp.com",
  databaseURL: "https://swartz-b3579.firebaseio.com",
  projectId: "swartz-b3579",
  storageBucket: "swartz-b3579.appspot.com",
  messagingSenderId: "161916081324",
  appId: "1:161916081324:web:12b3ba47da81b548d97b09"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

Vue.use(ElementUI, { locale });

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      i18n,
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

// app = new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");
