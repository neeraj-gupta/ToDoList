var webpack = require('webpack');
var path    = require('path');

module.exports = function (app, env) {
  var config  = require('./webpack.config')(app, env);
  var name = 'dist/' + app + ((app.indexOf('mobile') > -1) ? '/www/' : '');
  
  config.output = {
    filename: '[name].bundle.js',
    publicPath: '',
    path: path.resolve(__dirname, name)
  };

  config.plugins = config.plugins.concat([

    // Reduces bundles total size
    new webpack.optimize.UglifyJsPlugin({
      mangle: {

        // You can specify all variables that should not be mangled.
        // For example if your vendor dependency doesn't use modules
        // and relies on global variables. Most of angular modules relies on
        // angular global variable, so we should keep it unchanged
        except: ['$super', '$', 'exports', 'require', 'angular']
      },
      compress: {
          warnings: false
      }
    })
  ]);

  return config;
};
