import { defineStore } from 'pinia'

import axios from 'axios'

// const API_ENDPOINT = 'http://127.0.0.1:8000/api'
const API_ENDPOINT = 'http://192.168.31.200:8000/api'


export const useCoreStore = defineStore({
  id: 'core',
  state: () => ({
    wallets: [],
    assets: [],
    blockchains: [],
    history: [],
    totalBalance: 0
  }),
  actions: {
    async loadWallets() {
      axios.get(`${API_ENDPOINT}/wallet/?format=json`).then((response) => this.wallets = response.data)
    },
    async addWallet(name, address) {
      return await axios.post(`${API_ENDPOINT}/wallet/`, {
        "name": name,
        "address": address
      })
    },
    async delWallet(walletId) {
      return await axios.delete(`${API_ENDPOINT}/wallet/${walletId}`)
    },
    async getWallet(walletId) {
      return await axios.get(`${API_ENDPOINT}/wallet/${walletId}`)
    },
    async updateWallet(walletId, name, address) {
      return await axios.put(`${API_ENDPOINT}/wallet/${walletId}`, {
        "name": name,
        "address": address
      })
    },
    async loadAssets() {
      axios.get(`${API_ENDPOINT}/assets/?format=json`).then((response) => this.assets = response.data)
    },
    async loadBlockchains() {
      axios.get(`${API_ENDPOINT}/blockchain/?format=json`).then((response) => this.blockchains = response.data)
    },
    async loadHistory() {
      axios.get(`${API_ENDPOINT}/history/?format=json`).then((response) => this.history = response.data)
    },
    async loadHistoryChart() {
      return axios.get(`${API_ENDPOINT}/history/?format=json`)
    }
  },
  getters: {
    getAssetsBalance(state) {
      let assets = {}

      state.wallets.forEach(wallet => {
        wallet.assets_on_blockchains.forEach(assetOnBlockchains => {
          const asset = assetOnBlockchains.asset_on_blockchain.asset
          const balance = assetOnBlockchains.balance;
          assets[asset.name] = assets[asset.name] || asset;
          assets[asset.name].balance = (assets[asset.name].balance || 0) + Number(balance.balance);
          assets[asset.name].balance_with_decimals = assets[asset.name].balance / Math.pow(10, asset.decimals)
        })
      })

      assets = Object.values(assets)
      assets.sort((a, b) => b.last_price - a.last_price);
      return assets
    },
    getTotalBalance(state) {
      return this.getAssetsBalance.reduce((sum, current) => sum + current.last_price * current.balance_with_decimals, 0)
    }
  }
})
