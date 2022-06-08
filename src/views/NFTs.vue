<script setup>
import { useCoreStore, DEFAULT_NFT_STATE } from "@/stores/core";
import { onMounted, onUnmounted } from "vue";

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadNFTs();
});

onUnmounted(() => {
  coreStore.nfts = JSON.parse(JSON.stringify(DEFAULT_NFT_STATE));
});

window.onscroll = () => {
  let bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight;

  const isMoreToLoad =
    coreStore.nfts.statistic.count / coreStore.nfts.pagination.size >
    coreStore.nfts.pagination.current;
  if (bottomOfWindow && !coreStore.nfts.isLoading && isMoreToLoad) {
    coreStore.loadNFTs();
  }
};

function processImgUrl(url) {
  if (!url) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAETCAQAAAC/oCozAAAB6UlEQVR42u3SQQ0AAAjEMM41IhGFBMK/lbAsPQWH2ASbYBNsgk2wCTbBJmATbIJNsAk2wSbYBGyCTbAJNsEm2ASbYBOwCTbBJtgEm2ATbAI2wSbYBJtgE2yCTcAm2ASbYBNsgk2wCTYBm2ATbIJNsAk2wSZgE2yCTbAJNsEm2ARsgk2wCTbBJtgEm2ATsAk2wSbYBJtgE2wCNsEm2ASbYBNsgk2wCdgEm2ATbIJNsAk2AZtgE2yCTbAJNsEmYBNsgk2wCTbBJtgEm4BNsAk2wSbYBJtgE7AJNsEm2ASbYBNsAjbBJtgEm2ATbIJNsAnYBJtgE2yCTbAJNgGbYBNsgk2wCTbBJthEBGyCTbAJNsEm2ASbgE2wCTbBJtgEm2ATsAk2wSbYBJtgE2yCTcAm2ASbYBNsgk2wCdgEm2ATbIJNsAk2AZtgE2yCTbAJNsEm2ARsgk2wCTbBJtgEm4BNsAk2wSbYBJtgE2xiE2yCTbAJNsEm2ASbgE2wCTbBJtgEm2ATsAk2wSbYBJtgE2yCTcAm2ASbYBNsgk2wCdgEm2ATbIJNsAk2AZtgE2yCTbAJNsEm2ARsgk2wCTbBJtgEm4BNsAk2wSbYBJtgE2xiE2yCTbAJNsEm2ASbgE2wCTbBJtgEm2ATsAkPC/vHXS+DZi1UAAAAAElFTkSuQmCC'
  if (url.startsWith("ipfs://")) return url.replace("ipfs://", 'https://ipfs.io/ipfs/');
  return url;
}
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
                @input="coreStore.loadNFTs()"
              ></v-text-field>
              Loaded {{ coreStore.nfts.data.length }} of
              {{ coreStore.nfts.statistic.count }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="coreStore.nfts.data.length > 0 || coreStore.nfts.isLoading">
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
            <v-card-subtitle
              ><span class="overme">{{ nft.token_id }}</span></v-card-subtitle
            >
            <v-img
              :aspect-ratio="1 / 1"
              :src="processImgUrl(nft.image_url)"
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
                  <v-card
                  v-if="!nft.image_url"
                    elevation="8"
                    style="margin-left: 10px; padding-left: 5px; padding-right: 5px"
                    color="secondary"
                  >
                    Can't load image
                  </v-card>
                </v-app-bar>
              </v-layout>
            </v-img>
          </v-card>
          <v-card></v-card>
        </v-col>
        <v-col sm="6" lg="2" v-show="coreStore.nfts.isLoading">
          <v-card>
            <v-card-text>
              <div class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <span style="padding: 10px">Loading</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-card>
            <v-card-text v-if="coreStore.nfts.search == ''"
              >You cunnently doesn't have any NFT</v-card-text
            >
            <v-card-text v-else
              >Can't find any NFT with this request</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>