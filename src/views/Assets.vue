<script setup>
import { useCoreStore } from "@/stores/core";
import { onMounted } from "vue";

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadAssets();
});
</script>

<template>
  <v-row v-for="asset in coreStore.assets" :key="asset.id" >
    <v-col>
      <v-card elevation="1">
        <v-card-title>
          <span style="padding-right: 10px">{{ asset.name }}</span>
        </v-card-title>
        <v-card-subtitle
          >{{ asset.ticker }} | Decimals: {{ asset.decimals }}</v-card-subtitle
        >
        <v-card-text>
          <v-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="streach">Blockchain name</th>
                  <th class="streach">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="assets_on_blockchain in asset.assets_on_blockchains"
                  :key="assets_on_blockchain.id"
                >
                  <td>
                    {{ assets_on_blockchain.blockchain.name }}
                  </td>
                  <td>
                    {{ assets_on_blockchain.address || "Native" }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-table>
        </v-card-text>
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