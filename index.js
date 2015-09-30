'use strict'

let Door = require('./lib/door')

let register = function(server, options, next) {
  let door = new Door(options)
  server.expose('door', door)

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
