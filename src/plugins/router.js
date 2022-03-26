import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Wallets from "@/views/Wallets.vue";
import WalletAdd from "@/views/WalletAdd.vue";
import WalletEdit from "@/views/WalletEdit.vue";
import Assets from "@/views/Assets.vue";
import Blockchains from "@/views/Blockchains.vue";
import Providers from "@/views/Providers.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/wallets",
    name: "Wallets",
    component: Wallets
  },
  {
    path: "/wallets/add",
    name: "WalletAdd",
    component: WalletAdd
  },
  { 
    path: '/wallets/:id/edit',
    name: "WalletEdit",
    component: WalletEdit
  },
  { 
    path: '/assets',
    name: "Assets",
    component: Assets
  },
  { 
    path: '/blockchains',
    name: "Blockchains",
    component: Blockchains
  },
  { 
    path: '/providers',
    name: "Providers",
    component: Providers
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;