'use strict'

let Door = require('./lib/door')
let routes = require('./lib/routes')

let register = function(server, options, next) {
  let door = new Door(options)
  server.expose('door', door)

  routes(server, door)

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
