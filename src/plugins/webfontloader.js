<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:32f6214906f7686ddbf79f50a239c5275e0fe7d9e5d4e43c408aa8327bc27bd9
size 360
=======
/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts () {
    const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')
  
    webFontLoader.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900&display=swap'],
      },
    })
  }
  
>>>>>>> 2190573f (wed14)
