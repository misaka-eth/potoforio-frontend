import { defineStore } from 'pinia'

import axios from 'axios'

export const useAssetsStore = defineStore({
    id: 'assets',
    state: () => ({
      assets: [],
      totalBalance: 0
    }),
    actions: {
        async loadAssets() {
          axios.get('http://127.0.0.1:8000/api/wallet/?format=json').then((response) => this.assets = response.data)
        },
        async addWallet(name, address) {
          return await axios.post('http://127.0.0.1:8000/api/wallet/', {
            "name": name,
            "address": address
          })
        },
        async delWallet(walletId) {
          return await axios.delete(`http://127.0.0.1:8000/api/wallet/${walletId}`)
        }
    },
    getters: {
      getTokensBalance(state){
        let tokens = {} 

        state.assets.forEach(wallet => {
            wallet.tokens_on_blockchains.forEach(tokenOnBlockchains => {
                const token = tokenOnBlockchains.token_on_blockchain.token
                const balance = tokenOnBlockchains.balance;
                tokens[token.name] = tokens[token.name] || token;
                tokens[token.name].balance = (tokens[token.name].balance || 0) + Number(balance.balance);
                tokens[token.name].balance_with_decimals = tokens[token.name].balance / Math.pow(10, token.decimals)
            })
        })
        
        console.log(typeof(tokens))
        tokens = Object.values(tokens)

        tokens.sort((a, b) => b.last_price - a.last_price);

        return tokens
      },
      getTotalBalance(state){
        return this.getTokensBalance.reduce((sum, current)=> sum + current.last_price * current.balance_with_decimals, 0)
      }
    }
})
