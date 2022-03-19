<script setup>

import { useAssetsStore } from '@/stores/assets'
const assets = useAssetsStore()

function calcBalance(tokens_on_blockchain) {
    const balance = tokens_on_blockchain.balance.balance
    const decimals = tokens_on_blockchain.token_on_blockchain.token.decimals

    return balance / Math.pow(10, decimals)
}

async function deleteWallet(walletId){
    assets.delWallet(walletId).then((result) => assets.loadAssets())
}
</script>

<template> 
    <v-container fill-height class="float-right">
        <v-card>
            <v-card-text>
                <v-btn color="primary" :to="{path: '/wallets/add'}">Add wallet</v-btn>
            </v-card-text>
        </v-card>
        <v-card v-for="wallet in assets.assets" :key="wallet.id" elevation="1">
            <v-card-title>
                <span style="padding-right: 10px;">{{ wallet.name }}</span>
                
                <a @click="deleteWallet(wallet.id)" style="padding-right: 4px;"><v-icon size="18px">mdi-delete-circle-outline</v-icon></a>
                <router-link :to="{path: `/wallets/${wallet.id}/edit`}"><v-icon size="18px">mdi-circle-edit-outline</v-icon></router-link>
            </v-card-title>
            <v-card-subtitle>{{ wallet.address }}</v-card-subtitle>
            <v-card-text>
                <v-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="streach">Blockchain</th>
                            <th class="streach">Token</th>
                            <th class="streach">Balance</th>
                            <th class="streach">Price</th>
                            <th class="streach">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tokens_on_blockchain in wallet.tokens_on_blockchains" :key="tokens_on_blockchain.id">
                            <td v-if="tokens_on_blockchain.token_on_blockchain.blockchain.explorer">
                                <a :href="tokens_on_blockchain.token_on_blockchain.blockchain.explorer + wallet.address" target="_blank">
                                    {{ tokens_on_blockchain.token_on_blockchain.blockchain.name }} 
                                    <v-icon>mdi-open-in-new</v-icon>
                                </a>
                            </td>
                            <td v-else>{{ tokens_on_blockchain.token_on_blockchain.blockchain.name }}</td>
                            <td>{{ tokens_on_blockchain.token_on_blockchain.token.name }}</td>
                            <td>
                                {{ calcBalance(tokens_on_blockchain) }} {{ tokens_on_blockchain.token_on_blockchain.token.ticker }}  

                                <div v-if="tokens_on_blockchain.balance.manual" class="tooltip">
                                    <v-icon >mdi-circle-edit-outline</v-icon> 
                                    <span class="tooltiptext">Manualy added</span>
                                </div>
                                
                                <div  v-else class="tooltip">
                                    <v-icon>mdi-cube-scan</v-icon>
                                    <span class="tooltiptext">Automaticaly scanned</span>
                                </div>
                            </td>
                            <td>{{ tokens_on_blockchain.token_on_blockchain.token.last_price }}$</td>
                            <td>{{ Number((calcBalance(tokens_on_blockchain) * tokens_on_blockchain.token_on_blockchain.token.last_price).toFixed(2)) }}$</td>
                        </tr>
                    </tbody>
                    </template>
                </v-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
.v-card {
    margin: 10px;
}

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