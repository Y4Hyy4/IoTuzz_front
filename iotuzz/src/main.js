import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "axios";

import dataV from "@jiaminghi/data-view";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/less/index.less";

import "./api/mock";

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.use(ElementUI);
Vue.use(dataV);

// 路由守卫逻辑
router.beforeEach((to, from, next) => {
  // store.commit('clearToken')
  store.commit("getToken");
  const token = store.state.user.token;
  // console.log("@token", token);
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: (h) => h(App),
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
