<script setup>
import PFNavication from "./components/PFNavication.vue";
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
