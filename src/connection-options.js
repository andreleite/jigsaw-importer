require('dotenv').config()
const url = require('url')
const parsePG = require('pg-connection-string').parse
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const str = process.env.NODE_ENV.toUpperCase() === 'TEST'
  ? 'jigsaw-importer-test.sqlite'
  : process.env.DB || 'jigsaw-importer.sqlite'

module.exports = (() => {
  const parsed = url.parse(str)
  let { protocol } = parsed
  if (protocol && protocol.indexOf('maria') === 0) {
    protocol = 'maria'
  }
  if (protocol === null) {
    return {
      client: 'sqlite3',
      connection: {
        filename: './' + str
      },
      useNullAsDefault: true
    }
  }
  if (protocol.slice(-1) === ':') {
    protocol = protocol.slice(0, -1);
  }
  return {
    client: protocol,
    connection: protocol === 'postgres' ? parsePG(str) : connectionObject(parsed)
  }
})()
