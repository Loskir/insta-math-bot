const Telegram = require('telegraf/telegram')

const config = require('../config')

let me = null

module.exports = async () => {
  if (!me) {
    const bot = new Telegram(config.bot_token)
    me = await bot.getMe()
  }
  return me
}
