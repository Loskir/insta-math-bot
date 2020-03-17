module.exports = (ctx, next) => {
  return next().then(() => {
    if (ctx.chat && ctx.chat.type === 'private' && ctx.user) {
      ctx.user.last_activity_at = new Date()
      return ctx.user.save()
    }
  })
}
