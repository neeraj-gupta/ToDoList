var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');

module.exports = function (app, env) {
  var config = require('./webpack.config')(app, env);

  config.output = {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, '.' + app + '-tmp')
  };

  config.plugins = config.plugins.concat([

    // Adds webpack HMR support. It act's like livereload,
    // reloading page after webpack rebuilt modules.
    // It also updates stylesheets and inline assets without page reloading.
    new webpack.HotModuleReplacementPlugin()
  ]);

  return config;
};
