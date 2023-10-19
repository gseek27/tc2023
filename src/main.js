<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:5d4d9f103969984c3d850987f5f6cd4b0e8f0f2e180ff12c970ed39edf97a357
size 506
=======
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
>>>>>>> 2190573f (wed14)
