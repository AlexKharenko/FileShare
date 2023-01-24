import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "HomeRoute",
    component: HomeView,
  },
  {
    path: "/login",
    name: "LoginRoute",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/folders/:id",
    name: "FolderRoute",
    component: () => import("../views/FolderView.vue"),
  },
  {
    path: "/share/file",
    name: "ShareFileRoute",
    component: () => import("../views/ShareFileView.vue"),
  },
  {
    path: "/share/folder",
    name: "ShareFolderRoute",
    component: () => import("../views/ShareFolderView.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "Not Found",
    },
    component: function () {
      return import("../views/404View.vue");
    },
  },
  {
    path: "/500",
    name: "500",
    meta: {
      title: "Server Internal Error",
    },
    component: function () {
      return import("../views/500View.vue");
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title =
    toRoute.meta && toRoute.meta.title ? toRoute.meta.title : "FileShare";
  if (store.getters.getErrorMessage !== "") store.dispatch("resetErrorMessage");
  if ((toRoute.name === "500" || toRoute.name === "404") && !fromRoute.name)
    return next({ name: "HomeRoute" });
  next();
});

export default router;
