import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/viewing/:id",
    name: "viewing",
    component: () => import("../views/PageViewing.vue"),
  },
  {
    path: "/likes/:id",
    name: "likes",
    component: () => import("../views/PageLikes.vue"),
  },
  {
    path: "/sympathy/:id",
    name: "sympathy",
    component: () => import("../views/PageSympathy.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
