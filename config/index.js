const fs = require('fs')
const yaml = require('js-yaml')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  ...yaml.safeLoad(fs.readFileSync(`${__dirname}/config.yaml`))[NODE_ENV],
  NODE_ENV,
}
