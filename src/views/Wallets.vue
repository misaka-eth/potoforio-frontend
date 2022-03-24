<script setup>
import { useCoreStore } from "@/stores/core";
const coreStore = useCoreStore();

function calcBalance(assets_on_blockchain) {
  const balance = assets_on_blockchain.balance.balance;
  const decimals = assets_on_blockchain.asset_on_blockchain.asset.decimals;

  return balance / Math.pow(10, decimals);
}

async function deleteWallet(walletId) {
  coreStore.delWallet(walletId).then((result) => coreStore.loadWallets());
}
</script>

<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <v-btn color="primary" :to="{ path: '/wallets/add' }"
            >Add wallet</v-btn
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-for="wallet in coreStore.wallets" :key="wallet.id">
    <v-col>
      <v-card elevation="1">
        <v-card-title>
          <span style="padding-right: 10px">{{ wallet.name }}</span>

          <a @click="deleteWallet(wallet.id)" style="padding-right: 4px"
            ><v-icon size="18px">mdi-delete-circle-outline</v-icon></a
          >
          <router-link :to="{ path: `/wallets/${wallet.id}/edit` }"
            ><v-icon size="18px">mdi-circle-edit-outline</v-icon></router-link
          >
        </v-card-title>
        <v-card-subtitle>{{ wallet.address }}</v-card-subtitle>
        <v-card-text>
          <v-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="streach">Blockchain</th>
                  <th class="streach">Asset</th>
                  <th class="streach">Balance</th>
                  <th class="streach">Price</th>
                  <th class="streach">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="assets_on_blockchain in wallet.assets_on_blockchains"
                  :key="assets_on_blockchain.id"
                >
                  <td
                    v-if="
                      assets_on_blockchain.asset_on_blockchain.blockchain
                        .explorer
                    "
                  >
                    <a
                      :href="
                        assets_on_blockchain.asset_on_blockchain.blockchain
                          .explorer + wallet.address
                      "
                      target="_blank"
                    >
                      {{
                        assets_on_blockchain.asset_on_blockchain.blockchain.name
                      }}
                      <v-icon>mdi-open-in-new</v-icon>
                    </a>
                  </td>
                  <td v-else>
                    {{
                      assets_on_blockchain.asset_on_blockchain.blockchain.name
                    }}
                  </td>
                  <td>
                    {{ assets_on_blockchain.asset_on_blockchain.asset.name }}
                  </td>
                  <td>
                    {{ calcBalance(assets_on_blockchain) }}
                    {{ assets_on_blockchain.asset_on_blockchain.asset.ticker }}

                    <div
                      v-if="assets_on_blockchain.balance.manual"
                      class="tooltip"
                    >
                      <v-icon>mdi-circle-edit-outline</v-icon>
                      <span class="tooltiptext">Manualy added</span>
                    </div>

                    <div v-else class="tooltip">
                      <v-icon>mdi-cube-scan</v-icon>
                      <span class="tooltiptext">Automaticaly scanned</span>
                    </div>
                  </td>
                  <td>
                    {{
                      assets_on_blockchain.asset_on_blockchain.asset.last_price
                    }}$
                  </td>
                  <td>
                    {{
                      Number(
                        (
                          calcBalance(assets_on_blockchain) *
                          assets_on_blockchain.asset_on_blockchain.asset
                            .last_price
                        ).toFixed(2)
                      )
                    }}$
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
  width: 20%;
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