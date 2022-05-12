<script setup>
import { useCoreStore } from "@/stores/core";
import { onMounted } from "vue";

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadNFTs();
});

window.onscroll = () => {
  let bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight;

  if (bottomOfWindow) {
    coreStore.loadNFTs();
  }
};
</script>

<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-text-field
                label="Search (name, token id, blockchain)"
                v-model="coreStore.nfts.search"
                @keyup="coreStore.loadNFTs"
              ></v-text-field>
              Loaded {{ coreStore.nfts.data.length }} of
              {{ coreStore.nfts.statistic.count }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="nft in coreStore.nfts.data" :key="nft.id" sm="6" lg="2">
          <v-card>
            <v-card-title>
              <span class="overme">{{ nft.name }}</span>
              <v-spacer />
              <a
                style="font-size: 14px"
                :href="
                  nft.blockchain.nft_explorer +
                  nft.category.category_id +
                  '/' +
                  nft.token_id
                "
                target="_blank"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </a>
            </v-card-title>
            <v-card-subtitle><span class="overme">{{ nft.token_id }}</span></v-card-subtitle>
            <v-img
              :aspect-ratio="1 / 1"
              :src="nft.image_url"
              coverclass="text-white"
            >
              <v-layout full-height>
                <v-app-bar
                  density="comfortable"
                  color="rgba(0, 0, 0, 0)"
                  flat
                  theme="dark"
                >
                  <v-card
                    elevation="8"
                    style="padding-left: 5px; padding-right: 5px"
                    color="primary"
                  >
                    {{ nft.blockchain.name }}
                  </v-card>
                </v-app-bar>
              </v-layout>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
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