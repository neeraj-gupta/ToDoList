'use strict';

var auth        = require ('auth/auth.controller');
var <%= name %> = require ('./<%= name %>.controller');

module.exports = function (api) {

  // If you want to have a route secured by the use role you can also use
  // auth.hasRole('admin'[, 'developer']) instead of auth.isAuthenticated()
  api.post('/v/1/<%= name %>',      auth.isAuthenticated(), <%= name %>.create  );
  api.get ('/v/1/<%= name %>',      auth.isAuthenticated(), <%= name %>.find    );
  api.get ('/v/1/<%= name %>/:id',  auth.isAuthenticated(), <%= name %>.findOne );
  api.put ('/v/1/<%= name %>/:id',  auth.isAuthenticated(), <%= name %>.update  );
  api.del ('/v/1/<%= name %>/:id',  auth.isAuthenticated(), <%= name %>.remove  );

};
