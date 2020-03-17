const Composer = require('telegraf/composer')

const crypto = require('crypto')

const composer = new Composer()

composer.on('inline_query', async (ctx) => {
  const text = ctx.inlineQuery.query
  ctx.log.info(`inline: ${text}`)

  /*const webpBuffer = await getWebpBuffer(
    text,
    {
      color: 'red',
      buttons_show: {
        ok: false,
        cancel: false,
      },
      showShadow: false,
    }
  )

  const webpBufferOk = await getWebpBuffer(
    text,
    {
      color: 'red',
      buttons_show: {
        ok: true,
        cancel: false,
      },
      showShadow: false,
    }
  )

  const webpBufferOkCancel = await getWebpBuffer(
    text,
    {
      color: 'red',
      buttons_show: {
        ok: true,
        cancel: true,
      },
      showShadow: false,
    }
  )

  const message = await ctx.telegram.sendDocument(
    -1001265339159,
    {source: webpBuffer, filename: 'sticker.webp'}
  )

  const messageOk = await ctx.telegram.sendDocument(
    -1001265339159,
    {source: webpBufferOk, filename: 'sticker.webp'}
  )

  const messageOkCancel = await ctx.telegram.sendDocument(
    -1001265339159,
    {source: webpBufferOkCancel, filename: 'sticker.webp'}
  )

  // const jpeg = await pngToJpeg({quality: 90})(sourcePng)
  // const result = await uploadByBuffer(jpeg)
  // const url = result.link
  // console.log(url)

  const fileId = message.sticker.file_id
  const fileIdOk = messageOk.sticker.file_id
  const fileIdOkCancel = messageOkCancel.sticker.file_id*/

  const e = encodeURIComponent(text)

  return ctx.answerInlineQuery([
    {
      type: 'photo',
      id: 'tiger',

      photo_url: `https://www.tokkoro.com/picsup/5012725-leopard-animals-hd-4k.jpg`,
      thumb_url: `https://www.tokkoro.com/picsup/5012725-leopard-animals-hd-4k.jpg`,
    },
    {
      type: 'photo',
      id: '1',

      photo_url: `https://via.placeholder.com/${e}.jpeg`,
      thumb_url: `https://via.placeholder.com/${e}.jpeg`,
    },
    {
      type: 'photo',
      id: '2',

      photo_url: `http://via.placeholder.com/${e}.jpeg`,
      thumb_url: `http://via.placeholder.com/${e}.jpeg`,

      photo_width: 100,
      photo_height: 303,
    },
    {
      type: 'photo',
      id: '3',

      photo_url: `http://via.placeholder.com/400x500.jpeg`,
      thumb_url: `http://via.placeholder.com/400x500.jpeg`,
    },
    {
      type: 'photo',
      id: '4',

      photo_url: `http://via.placeholder.com/111.jpeg`,
      thumb_url: `http://via.placeholder.com/111.jpeg`,
    },
    // {
    //   type: 'photo',
    //   id: crypto.createHash('md5').update(text).digest('hex'),
    //
    //   photo_url: `https://math.loskir.ru/generateSocial?data=${encodeURIComponent(text)}`,
    //   thumb_url: `https://math.loskir.ru/generateSocial?data=${encodeURIComponent(text)}`,
      // photo_width: 512,
      // photo_height: 256,
    // },
    // {
    //   type: 'photo',
    //   id: crypto.createHash('md5').update(`${text}_ok`).digest('hex'),
    //
    //   photo_url: `https://homm3.loskir.ru/bot?text=${text}`,
    //   thumb_url: `https://homm3.loskir.ru/bot?text=${text}`,
    //
    //   photo_width: 512,
    //   photo_height: 256,
    // },
    // {
    //   type: 'photo',
    //   id: crypto.createHash('md5').update(`${text}_ok_cancel`).digest('hex'),
    //
    //   photo_url: `https://homm3.loskir.ru/bot?text=${text}&show_cancel=true`,
    //   thumb_url: `https://homm3.loskir.ru/bot?text=${text}&show_cancel=true`,
    //   photo_width: 512,
    //   photo_height: 256,
    // },
  ], {
    cache_time: 0,
    is_personal: true,
  })
})

composer.on('chosen_inline_result', ({chosenInlineResult}) => {
  console.log('chosen inline result', chosenInlineResult)
})

module.exports = composer
