import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'

loadFonts()

import {VueHighcharts} from 'vue3-highcharts';

createApp(App)
  .use(vuetify).use(router).use(createPinia()).use(VueHighcharts)
  .mount('#app')
