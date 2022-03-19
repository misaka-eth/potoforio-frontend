<script setup>

import { useAssetsStore } from '@/stores/assets'
import { onMounted } from 'vue'

const assets = useAssetsStore()

onMounted(() => {
  assets.loadBlockchains();
})

</script>

<template> 
    <v-container fill-height class="float-right">
        <v-card v-for="blockchain in assets.blockchains" :key="blockchain.id" elevation="1">
            <v-card-title>
                <span style="padding-right: 10px;">{{ blockchain.name }}</span>
            </v-card-title>
            <v-card-subtitle>Explorer: {{ blockchain.explorer }}</v-card-subtitle>
            <v-card-text>

            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
.v-card {
    margin: 10px;
}

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