import { defineStore } from 'pinia'

import axios from 'axios'

const http = axios.create({
  baseURL: '/api/',
});

const RELATIVES = {
  'all': Date.now(),
  'month': 1000 * 60 * 60 * 24 * 30,
  'week': 1000 * 60 * 60 * 24 * 7,
  'day': 1000 * 60 * 60 * 24
}

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

export const DEFAULT_NFT_STATE =  {
  data: [],
  statistic: {
    count: 0
  },
  pagination: {
    current: 0,
    size: 50
  },
  search: "",
  last_search: "",
  isLoading: true,
}

export const useCoreStore = defineStore({
  id: 'core',
  state: () => ({
    wallets: [],
    assets: [],
    blockchains: [],
    history: {
      balances: [],
      timestamps: []
    },
    history_settings: localStorage.history_settings || 'week',
    providers: [],
    nfts: {...DEFAULT_NFT_STATE},
    totalBalance: 0,
    navigation: true
  }),
  actions: {
    async loadWallets() {
      http.get('wallet/').then((response) => this.wallets = response.data).catch((err) => console.log(err))
    },
    async addWallet(name, address) {
      return await http.post('wallet/', {
        "name": name,
        "address": address
      })
    },
    async delWallet(walletId) {
      return await http.delete(`wallet/${walletId}`)
    },
    async getWallet(walletId) {
      return await http.get(`wallet/${walletId}`)
    },
    async updateWallet(walletId, name, address) {
      return await http.put(`wallet/${walletId}`, {
        "name": name,
        "address": address
      })
    },
    async loadAssets() {
      http.get(`assets/`).then((response) => this.assets = response.data)
    },
    async loadBlockchains() {
      http.get(`blockchain/`).then((response) => this.blockchains = response.data)
    },
    setHistorySetting(setting) {
      this.history_settings = setting;
      localStorage.history_settings = setting;
      this.loadHistory()
    },
    async loadHistory() {
      const params = {
        'format': 'json',
        'start_timestamp': Date.now() - RELATIVES[this.history_settings]
      }
      http.get(`history/`, { params: params }).then((response) => this.history = response.data)
    },
    async updateHistory() {
      if (!this.history) return this.loadHistory()

      const start_timestamp = this.history.timestamps[this.history.timestamps.length - 1]
      const params = {
        'format': 'json',
        'start_timestamp': start_timestamp
      }
      http.get(`history/`, { params: params }).then((response) => {
        this.history.balances = this.history.balances.concat(response.data.balances.slice(1))
        this.history.timestamps = this.history.timestamps.concat(response.data.timestamps.slice(1))
      })

    },
    async loadProviders() {
      http.get(`providers/?format=json`).then((response) => this.providers = response.data)
    },
    async loadNFTs() {
      const currentSearch = this.nfts.search;
      this.nfts.isLoading = true;
      // Remove current list if it's new search
      if (this.nfts.last_search != this.nfts.search) {
        this.nfts.pagination.current = 0
        this.nfts.statistic.count = 0
        this.nfts.data = []
      }

      http.get(`nfts/`, {
        params: {
          page: this.nfts.pagination.current + 1,
          page_size: this.nfts.pagination.size,
          search: this.nfts.search
        }
      }).then((response) => {
        if (currentSearch == this.nfts.search) // Drop old requests
        {
          this.nfts.data = this.nfts.data.concat(response.data.results)
          this.nfts.statistic.count = response.data.count
          this.nfts.pagination.current += 1
          this.nfts.last_search = this.nfts.search
          this.nfts.isLoading = false;
        }
      })
    },
    clearOldDataOnChart() {
      const startTimestamp = Date.now() - RELATIVES[this.history_settings]

      this.history.timestamps = this.history.timestamps.filter((value, index) => {
        if (value < startTimestamp)
          this.history.balances.remove(index)
        return value > startTimestamp
      })
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
      assets.sort((a, b) => (b.last_price * b.balance_with_decimals) - (a.last_price * a.balance_with_decimals));
      const hide_limit = localStorage.hide_limit || 10
      assets.map(asset => asset['show'] = ((asset.last_price * asset.balance_with_decimals) > hide_limit))
      return assets
    },
    getTotalBalance(state) {
      const totalBalance = this.getAssetsBalance.reduce((sum, current) => sum + current.last_price * current.balance_with_decimals, 0)
      // Add total balance to chart
      if (totalBalance && state.history.balances[state.history.balances.length - 1] != totalBalance) {
        state.clearOldDataOnChart()
        state.history.balances.push(totalBalance)
        state.history.timestamps.push(new Date().getTime())
      }
      return totalBalance
    },
    getDistributionData(state) {
      const labels = state.getAssetsBalance.map((el) => el.name)
      const data = state.getAssetsBalance.map(
        (el) => el.balance_with_decimals * el.last_price
      );
      return { labels, data }
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
