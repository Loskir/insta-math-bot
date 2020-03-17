const Telegraf = require('telegraf')
const RedisSession = require('telegraf-session-redis')

const Stage = require('telegraf/stage')

const mongoose = require('mongoose')

const log = require('./core/logs')

const getMe = require('./core/me')

const config = require('./config')

const {
  prepareMathjax,
} = require('./functions/mathjax')

void (async () => {
  await prepareMathjax()
  await mongoose.connect(config.mongodb, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const bot = new Telegraf(config.bot_token)

  const stage = new Stage()

  const session = new RedisSession({
    store: {
      ...config.redis,
      retry_strategy(options) {
        if (options.attempt > 10) {
          // End reconnecting with built in error
          throw new Error('Unable to connect to redis')
        }
        log.warn(`Attempt ${options.attempt}, trying to reconnect to redis`)
        return Math.min(options.attempt * 100, 3000)
      }
    },
  })
  bot.use(session)

  bot.use(require('./passThruMiddlewares/log'))

  bot.use(require('./passThruMiddlewares/user'))

  bot.use(require('./passThruMiddlewares/lastActivity'))

  bot.use(require('./middlewares/inline'))

  bot.catch((error) => {
    log.error('MTPBOT error: ', error)
    console.error(error.stack)
  })

  stage.use(require('./middlewares/main'))

  stage.register(require('./scenes/messageCreation'))

  bot.use(stage)

  const me = await getMe()
  bot.options.username = me.username

  bot.startPolling()

  log.info(`@${me.username} is running`)
})()
