
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import MDI CSS
import '@mdi/font/css/materialdesignicons.min.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi', // tells Vuetify to use MDI
  },
})


createApp(App).use(vuetify).use(router).mount('#app')
