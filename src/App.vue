<script setup>
import PFNavication from "./components/PFNavication.vue";

import { onMounted } from "vue";

import { useCoreStore } from "@/stores/core";
const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadWallets();

  // TODO: remove on unmount
  function update() {
    coreStore.loadWallets()
    setTimeout(update, 10000)
  }
  setTimeout(update, 10000)
});

function toggleNavigationPanel() {
  coreStore.navigation = !coreStore.navigation;
}

function updateCurrenySetting() {
  localStorage.currency_settings = coreStore.currency
}
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="toggleNavigationPanel"
      ></v-app-bar-nav-icon>
      <div class="logo">
        <v-icon>mdi-chart-donut</v-icon>
        <div class="logo-text">Potoforio</div>
      </div>
      <template v-slot:append>
        <div style="margin-top: 36px;">
        <v-select
          :items="coreStore.currencyes"
          v-model="coreStore.currency"
          label="Currency"
          :transition="{}"
          @update:model-value="updateCurrenySetting"
        /></div>
      </template>
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

.overme {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
