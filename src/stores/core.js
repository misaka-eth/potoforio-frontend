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

export const DEFAULT_NFT_STATE = {
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

const DEFAULT_CURRENCY_STATE = [{
  title: "USD",
  value: "USD",
  multiplier: 1,
  postfix: "$",
  decimals: 2
},
{
  title: "UAH",
  value: "UAH",
  multiplier: 36,
  postfix: " UAH",
  decimals: 2
},
{
  title: "RUB",
  value: "RUB",
  multiplier: 65,
  postfix: " RUB",
  decimals: 2
}]

export const useCoreStore = defineStore({
  id: 'core',
  state: () => ({
    wallets: [],
    assets: [],
    blockchains: [],
    history: [],
    history_settings: localStorage.history_settings || 'week',
    providers: [],
    nfts: { ...DEFAULT_NFT_STATE },
    totalBalance: 0,
    navigation: true,
    currencyes: DEFAULT_CURRENCY_STATE,
    currency: localStorage.currency_settings || 'USD',
  }),
  actions: {
    async loadWallets() {
      http.get('wallet/').then((response) => {
        this.wallets = response.data
        // Call getAssetsBalance to calculate currencyes
        this.getAssetsBalance
      }).catch((err) => console.log(err))
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
      this.history = [] // Clear old data manualy to force chart update, in other way chart loading took to long
      const params = {
        'format': 'json',
        'start_timestamp': Date.now() - RELATIVES[this.history_settings]
      }
      http.get(`history/`, { params: params }).then((response) => this.history = response.data)
    },
    async updateHistory() {
      if (!this.history) return this.loadHistory()

      const start_timestamp = this.history[this.history.length - 1][0]
      const params = {
        'format': 'json',
        'start_timestamp': start_timestamp
      }
      http.get(`history/`, { params: params }).then((response) => {
        this.history = this.history.concat(response.data.slice(1))
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

      // Save current asset as base currency
      const labels = assets.map((el) => {
        return { title: el.name, value: el.name, postfix: ' ' + el.ticker, multiplier: 1 / el.last_price, decimals: 4 }
      })
      state.currencyes = [...DEFAULT_CURRENCY_STATE, ...labels]
      //

      return assets
    },
    getTotalBalance(state) {
      const totalBalance = Number(this.getAssetsBalance.reduce((sum, current) => sum + current.last_price * current.balance_with_decimals, 0).toFixed(2))
      // Add total balance to chart
      const lastRecord = state.history[state.history.length - 1]
      if (totalBalance && lastRecord && lastRecord[1] != totalBalance) {
        state.history.push([new Date().getTime(), totalBalance])
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
    getCurrency(state) {
      return state.currencyes.filter(
        (el) => el.value === state.currency
      )[0];
    }
  }
})
