import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "PhanAnhKienNghi",
      path: "/PhanAnhKienNghi",
      component: () => import("@/views/PhanAnhKienNghi.vue"),
    },
  ],
});

export default router;
