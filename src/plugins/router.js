import { createWebHistory, createRouter } from "vue-router";
import Assets from "@/views/Assets.vue";


const routes = [
  {
    path: "/",
    name: "Assets",
    component: Assets,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;