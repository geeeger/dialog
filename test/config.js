var System = (function() { // eslint-disable-line
  var importer = bitimports
    .config({
      baseUrl: '../',
      paths: {
        chai: 'node_modules/chai/chai',
        babel: 'node_modules/babel-bits/dist/index'
      }
    })
    .plugin('js', {
      transform: {
        handler: 'babel',
        options: {
          presets: ['es2015'],
          sourceMaps: 'inline'
        }
      }
    });

  importer.logger.enable();
  return importer;
})();
