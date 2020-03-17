const nanoid = require('nanoid')

const utils = require('../core/utils')
const log = require('../core/logs')

module.exports = (ctx, next) => {
  const reqId = nanoid()
  ctx.log = log.child({
    reqId,
    scene: () => ctx.session
      // eslint-disable-next-line no-underscore-dangle
      && ctx.session.__scenes
      // eslint-disable-next-line no-underscore-dangle
      && ctx.session.__scenes.current,
    userId: ctx.from && ctx.from.id,
    user: ctx.from && utils.getUserString(ctx.from),
  })
  return next()
}
