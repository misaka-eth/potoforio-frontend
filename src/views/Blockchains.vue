<script setup>
import { useCoreStore } from "@/stores/core";
import { onMounted } from "vue";

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadBlockchains();
});
</script>

<template>
  <v-row v-for="blockchain in coreStore.blockchains" :key="blockchain.id">
    <v-col>
      <v-card elevation="1">
        <v-card-title>
          <span styFle="padding-right: 10px;">{{ blockchain.name }}</span>
        </v-card-title>
        <v-card-subtitle>Explorer: {{ blockchain.explorer }}</v-card-subtitle>
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

.streach {
  width: 50%;
}

a {
  color: rgb(var(--v-theme-on-background));
  text-decoration: none;
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 0;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>