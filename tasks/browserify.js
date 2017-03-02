var date = new Date();
var today = date.toDateString() + ' ' + date.toLocaleTimeString();
var banner = '/*! <%= pkg.name %> v<%= pkg.version %> - ' + today + '. (c) ' + date.getFullYear() + ' Miguel Castillo. Licensed under MIT */';

module.exports = {
  build: {
    files: {
      'dist/index.js': ['src/index.js']
    },
    options: {
      banner: banner,
      browserifyOptions: {
        detectGlobals: false,
        standalone: '<%= pkg.name %>'
      }
    }
  }
};
