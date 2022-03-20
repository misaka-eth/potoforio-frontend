<script setup>
import PFNavication from "./components/PFNavication.vue";

import { onMounted } from "vue";

import { useAssetsStore } from "@/stores/assets";
const assets = useAssetsStore();

let assetLoaderInterval = null;

onMounted(() => {
  assets.loadAssets();
  // TODO: remove on unmount
  assetLoaderInterval = setInterval(() => assets.loadAssets(), 5000);
});
</script>

<template>
  <v-app>
    <v-app-bar>
      <div class="logo">
        <v-icon>mdi-chart-donut</v-icon>
        <div class="logo-text">Potoforio</div>
      </div>
    </v-app-bar>
    <PFNavication />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col justify="center">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
html {
  /* TODO: Link backgroud color for theme */
  background-color: rgb(18, 18, 18);
}

a {
  color: rgb(var(--v-theme-on-background));
  text-decoration: none;
}

.logo {
  font-size: 24px;
  padding-left: 24px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.logo-text {
  padding-left: 8px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
</style>
