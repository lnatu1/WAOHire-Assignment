import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import DashboardView from "@views/DashboardView.vue";
import DashboardLayout from "@layouts/DashboardLayout.vue";
import UsersView from "@views/UsersView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => DashboardView,
      },
      {
        path: "users",
        name: "Users",
        component: () => UsersView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
