<script setup>

import { useAssetsStore } from '@/stores/assets'
const assets = useAssetsStore()

function calcBalance(tokens_on_blockchain) {
    const balance = tokens_on_blockchain.balance.balance
    const decimals = tokens_on_blockchain.token_on_blockchain.token.decimals

    return balance / Math.pow(10, decimals)
}

function getUrl(tokens_on_blockchain) {
    const blockchain_name = tokens_on_blockchain.token_on_blockchain.blockchain.name
    switch (blockchain_name){
        case "Ethereum":
            return "https://etherscan.io/address/"
        case "Polygon":
            return "https://polygonscan.com/address/"
        case "Ethereum 2.0":
            return "https://beaconscan.com/validator/"
        case "Bitcoin":
            return "https://blockchair.com/ru/bitcoin/address/"
        case "Ripple":
            return "https://xrpscan.com/account/"
        default:
            return false
    }
}

</script>

<template> 
    <v-container fill-height class="float-right">
            <v-card v-for="wallet in assets.assets" :key="wallet.id" elevation="1">
            <v-card-title>{{ wallet.name }}</v-card-title>
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
                                <td v-if="getUrl(tokens_on_blockchain)"> <a :href="getUrl(tokens_on_blockchain) + wallet.address" target="_blank">{{ tokens_on_blockchain.token_on_blockchain.blockchain.name }} <v-icon>mdi-checkbox-marked-circle</v-icon></a></td>
                                <td v-else>{{ tokens_on_blockchain.token_on_blockchain.blockchain.name }}</td>
                                <td>{{ tokens_on_blockchain.token_on_blockchain.token.name }}</td>
                                <td>{{ calcBalance(tokens_on_blockchain) }} {{ tokens_on_blockchain.token_on_blockchain.token.ticker }}</td>
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

</style>