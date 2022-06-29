import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function page(path) {
  return () =>
    import(/* webpackChunkName: '' */ `@/pages/${path}`).then(
      (m) => m.default || m
    );
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: page("Home.vue"),
    beforeEnter: basicAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: page("auth/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function basicAuth(to, from, next) {
  if (!localStorage.getItem("token")) {
    next("/login");
  } else {
    next();
  }
}

export default router;
