<script setup>
import PFNavication from "./components/PFNavication.vue";

import { onMounted } from 'vue'

import { useAssetsStore } from '@/stores/assets'
const assets = useAssetsStore()

onMounted(() => {
  assets.loadAssets();
  this.timerId = setInterval(() => assets.loadAssets(), 5000);
})

</script>

<template>
  <v-app>
    <v-app-bar></v-app-bar>
    <PFNavication />
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>

</style>
