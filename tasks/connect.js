var livereload = require("connect-livereload");
var env = require("./env");

module.exports = {
  test: {
    options: {
      port: env.testPortNumber,
      hostname: 'localhost'
    }
  },
  keepalive: {
    options: {
      port: env.keepalivePortNumber,
      host: 'localhost',
      keepalive: true,
      open: 'http://localhost:' + env.keepalivePortNumber + '/test/SpecRunner.html',
      middleware: function(connect, options, middlewares) {
        middlewares.unshift(livereload({ port: env.livereloadPortNumber }));
        return middlewares;
      }
    }
  },
  demo: {
    options: {
      port: env.demoPortNumber,
      host: 'localhost',
      keepalive: true,
      open: 'http://localhost:' + env.demoPortNumber + '/demo/index.html',
      middleware: function(connect, options, middlewares) {
        middlewares.unshift(livereload({ port: env.livereloadPortNumber }));
        return middlewares;
      }
    }
  }
};
