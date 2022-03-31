import { defineStore } from 'pinia'

import axios from 'axios'

const API_ENDPOINT = 'http://127.0.0.1:8000/api'
// const API_ENDPOINT = 'http://192.168.31.200:8000/api'


export const useCoreStore = defineStore({
  id: 'core',
  state: () => ({
    wallets: [],
    assets: [],
    blockchains: [],
    history: [],
    history_settings: localStorage.history_settings || 'week',
    providers: [],
    nfts: [],
    totalBalance: 0
  }),
  actions: {
    async loadWallets() {
      axios.get(`${API_ENDPOINT}/wallet/?format=json`).then((response) => this.wallets = response.data).catch((err) => console.log(err))
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
    setHistorySetting(setting){
      this.history_settings = setting;
      localStorage.history_settings = setting;
      this.loadHistory()
    },
    async loadHistory() {
      const relatives = {
        'all':  Date.now(),
        'month': 1000 * 60 * 60 * 24 * 30 ,
        'week': 1000 * 60 * 60 * 24 * 7,
        'day':  1000 * 60 * 60 * 24
      }
      const params = {
        'format': 'json',
        'start_timestamp': Date.now() - relatives[this.history_settings]
      }
      axios.get(`${API_ENDPOINT}/history/`, { params: params }).then((response) => this.history = response.data)
    },
    async updateHistory() {
      if (!this.history) return this.loadHistory()

      const start_timestamp = this.history.timestamps[this.history.timestamps.length-1]
      const params = {
        'format': 'json',
        'start_timestamp': start_timestamp
      }
      axios.get(`${API_ENDPOINT}/history/`, { params: params }).then((response) => {
        this.history.balances = this.history.balances.concat(response.data.balances.slice(1))
        this.history.timestamps = this.history.timestamps.concat(response.data.timestamps.slice(1))
      })
      
    },
    async loadProviders() {
      axios.get(`${API_ENDPOINT}/providers/?format=json`).then((response) => this.providers = response.data)
    },
    async loadNFTs() {
      axios.get(`${API_ENDPOINT}/nfts/?format=json`).then((response) => this.nfts = response.data)
    },
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
    },
    getDistributionData(state) {
      const labels = state.getAssetsBalance.map((el) => el.name)
      const data = state.getAssetsBalance.map(
        (el) => el.balance_with_decimals * el.last_price
      );
      return {labels, data}
    },
    getNFTCategories(state) {
      let categories = {};
      state.nfts.forEach((nft) => {
        categories[nft.category.category_id] = categories[nft.category.category_id] || nft.category
        categories[nft.category.category_id]['count'] = categories[nft.category.category_id]['count'] || 0
        categories[nft.category.category_id]['count'] += 1
      })
      categories = Object.values(categories)
      return categories
    }
  }
})
