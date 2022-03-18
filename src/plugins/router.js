import { createWebHistory, createRouter } from "vue-router";
import Assets from "@/views/Assets.vue";
import Wallets from "@/views/Wallets.vue";
import WalletAdd from "@/views/WalletAdd.vue";
import WalletEdit from "@/views/WalletEdit.vue";


const routes = [
  {
    path: "/",
    name: "Assets",
    component: Assets,
  },
  {
    path: "/wallets",
    name: "Wallets",
    component: Wallets,
  },
  {
    path: "/wallets/add",
    name: "WalletAdd",
    component: WalletAdd,
  },
  { 
    path: '/wallets/:id/edit',
    name: "WalletEdit",
    component: WalletEdit 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;