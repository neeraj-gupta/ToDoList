
var path = require ('path');
require('app-module-path').addPath(__dirname);
// console.log = function(){};
console.log('Loading restify server...');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('started with process.env.NODE_ENV as', process.env.NODE_ENV);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var restify     = require ('restify');
var _           = require ('lodash');
var config      = require ('config/environment');

var api = restify.createServer(_.merge({
    name: 'ToDo'
}, config.http));


require ('boundaries/socket').init(api);
require ('./config/restify')(api);
require ('./config/application')(api);
require ('./routes')(api);

// Require Server to listen on ipv6 and ipv4
api.listen(config.port, '::', function () {
    console.log('%s listening at %s', api.name, api.url);
});
