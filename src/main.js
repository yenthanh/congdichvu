import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

if (cookies.get("Token")) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + cookies.get("Token");
}
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    var originalConfig = error.config;
    if (error.response.status == 401) {
    } else {
      return Promise.reject(error);
    }
  }
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
