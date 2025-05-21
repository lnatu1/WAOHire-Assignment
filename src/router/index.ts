import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import DashboardLayout from "@layouts/DashboardLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@views/DashboardView.vue"),
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@views/UsersView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
