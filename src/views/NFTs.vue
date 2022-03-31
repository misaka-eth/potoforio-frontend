<script setup>
import { useCoreStore } from "@/stores/core";
import { onMounted } from "vue";

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadNFTs();
});
</script>

<template>
  <v-row>
    <v-col>
      <v-card elevation="1">
        <v-card-title>
          <span styFle="padding-right: 10px;">NFT by category</span>
        </v-card-title>
        <v-card-text>
          <v-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Categoty</th>
                  <th class="text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in coreStore.getNFTCategories" :key="category.id">
                  <td>{{ category.name }}</td>
                  <td>{{ category.count }}</td>
                </tr>
                {{ coreStore.getNFTWalletCategories }}
              </tbody>
            </template>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card elevation="1">
        <v-card-title>
          <span styFle="padding-right: 10px;">NFT list</span>
        </v-card-title>
        <v-card-text>
          <v-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Blockchain</th>
                  <th class="text-left">Wallet</th>
                  <th class="text-left">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="nft in coreStore.nfts" :key="nft.id">
                  <td>
                    <a
                      :href="nft.blockchain.nft_explorer + nft.category.category_id + '/' + nft.token_id"
                      target="_blank"
                    >
                      {{
                        nft.token_id
                      }}
                      <v-icon>mdi-open-in-new</v-icon>
                    </a>
                  </td>
                  <td>{{ nft.name }}</td>
                  <td>{{ nft.blockchain.name }}</td>
                  <td>{{ nft.wallet.name }}</td>
                  <td>{{ nft.category.category_id }}</td>
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