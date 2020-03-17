module.exports = {
  getUserString(from) {
    return `${from.first_name}${from.last_name ? ` ${from.last_name}` : ''}${from.username ? ` @${from.username}` : ''}`
  },
  getHTMLUserString(user) {
    return `<a href="tg://user?id=${user.id}">${this.getUserString(user)}</a>`
  },

  answerCbQuery(ctx, next) {
    if (ctx.callbackQuery) {
      ctx.answerCbQuery()
    }
    return next()
  },

  methodDecider(ctx) {
    return ctx.callbackQuery && !ctx.scene.state.not_edit ? 'editMessageText' : 'reply'
  },

  inRange(min, number, max) {
    return Math.max(min, Math.min(number, max))
  },
}
