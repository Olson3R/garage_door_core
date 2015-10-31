var Boom = require('boom')

var routes = function(server, door) {

  server.route({
    method: 'GET',
    path: '/door',
    config: {
      handler: function(request, response) {
        response({ status: door.status() })
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/door/toggle',
    config: {
      handler: function(request, response) {
        door.toggle()
        response()
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/door/open',
    config: {
      handler: function(request, response) {
        door.open()
        response()
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/door/close',
    config: {
      handler: function(request, response) {
        door.close()
        response()
      }
    }
  })

}

module.exports = routes
