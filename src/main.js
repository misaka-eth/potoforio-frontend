import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'

loadFonts()

import HighchartsVue from 'highcharts-vue'

import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'

stockInit(Highcharts)

createApp(App)
  .use(vuetify).use(router).use(createPinia()).use(HighchartsVue)
  .mount('#app')
