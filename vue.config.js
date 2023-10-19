<<<<<<< HEAD
<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:76d1efba57af71a19f741c7dd30f3def46267d35f794d4a12a586ded28505a74
size 468
=======
=======
>>>>>>> faea81d2 (Fix git fls errors)
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }, 
  publicPath: process.env.NODE_ENV === 'production'
  ? '/tc2023/'
  : '/',
  devServer: {
    host: 'localhost',
    allowedHosts: ['kharels-macbook.local','localhost']
  },

  pluginOptions: {
    vuetify: {}
  }

<<<<<<< HEAD
})
>>>>>>> 2190573f (wed14)
=======
})
>>>>>>> faea81d2 (Fix git fls errors)
