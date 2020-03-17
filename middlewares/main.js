const {Composer} = require('telegraf')
// const {uploadByBuffer} = require('telegraph-uploader')
// const pngToJpeg = require('png-to-jpeg')
// const Jimp = require('jimp')

const composer = new Composer()

composer.on('text', (ctx) => {
  return ctx.scene.enter('message-creation')
})

module.exports = composer
