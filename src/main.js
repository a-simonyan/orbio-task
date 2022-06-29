import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import YmapPlugin from "vue-yandex-maps";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const settings = {
  apiKey: process.env.VUE_APP_YANDEX_API,
  lang: "en_US",
  coordorder: "latlong",
  enterprise: false,
  version: "2.1",
};

Vue.use(YmapPlugin, settings);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
