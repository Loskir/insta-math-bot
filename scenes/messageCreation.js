const Scene = require('telegraf/scenes/base')

const utils = require('../core/utils')

const {
  getImageForSocialPreview,
} = require('../functions/sharp')

const {
  getSvg,
} = require('../functions/mathjax')

// const getConfigKeyboard = (config) => {
//   return Markup.inlineKeyboard([[
//     Markup.callbackButton(`As a photo`, `config_as_photo`, config.type === 'photo'),
//     Markup.callbackButton(`As a sticker`, `config_as_sticker`, config.type === 'sticker'),
//   ]])
// }

const scene = new Scene('message-creation')
scene.enter(utils.answerCbQuery)
scene.enter(async (ctx) => {
  ctx.scene.state.text = ctx.message.text
  ctx.log.info(ctx.scene.state.text)

  const png = await getImageForSocialPreview(getSvg(ctx.scene.state.text))

  // const jpeg = await pngToJpeg({quality: 90})(sourcePng)
  // const result = await uploadByBuffer(jpeg)
  // const url = result.link
  // console.log(url)
  // return replyWithPhoto({source: sourcePng})
  const message = await ctx.replyWithPhoto(
    {source: png},
    // Extra.markup(getConfigKeyboard(ctx.scene.state.config, false))
  )
  ctx.scene.state.message_id = message.message_id
})
scene.on('edited_message', async (ctx) => {
  ctx.scene.state.text = ctx.editedMessage.text

  ctx.log.info(`edit: ${ctx.scene.state.text}`)

  const png = await getImageForSocialPreview(getSvg(ctx.scene.state.text))

  // const jpeg = await pngToJpeg({quality: 90})(sourcePng)
  // const result = await uploadByBuffer(jpeg)
  // const url = result.link
  // console.log(url)
  // return replyWithPhoto({source: sourcePng})
  return ctx.telegram.editMessageMedia(
    ctx.chat.id,
    ctx.scene.state.message_id,
    null,
    {type: 'photo', media: {source: png}},
    // Extra.markup(getConfigKeyboard(ctx.scene.state.config, false))
  )
})

module.exports = scene
