import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "MainWindow",
      component: () => import("../views/MainWindow.vue"),
      children: [],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login"),
    },
  ],
  mode: "history",
});
