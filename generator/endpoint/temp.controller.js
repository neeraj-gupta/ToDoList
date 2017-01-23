'use strict';

var error			        = require ('backend/errorHandling');
var <%= upCaseName %> = require ('./<%= name%>.model');

/**
 * create - create a new <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.create = function (req, res, next) {
  if (req.body.id != null) {
    delete req.body.id;
  }
  var <%= name %> = new <%= upCaseName %>(req.body);
  <%= name %>.insert({}).then (function (saved) {
    res.json(saved);
    next();
  })
  .catch(error.handleRequestError(req, res, next));
};

/**
 * find - find all the <%= name %> objects by query
 * 				can call like so : /v/1/<%= name %>?options.pageState=<pageState>&active=true
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.find = function (req, res, next) {
  var options = req.query.options || {};
  if (req.query.options) {
    delete req.query.options;
  }
  var <%= name %> = new <%= upCaseName %>();
  <%= name %>.findDetailed (req.query, options)
  .then (function (<%= name %>s) {
    res.json(<%= name %>s);
    next();
  })
  .catch(error.handleRequestError(req, res, next));
};

/**
 * findOne - findOne of the <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.findOne = function (req, res, next) {
  var <%= name %> = new <%= upCaseName %>();
  <%= name %>.findOne ({ id : req.params.id })
  .then (function (<%= name %>s) {
    res.json (<%= name %>s);
    next();
  })
  .catch (error.handleRequestError(req, res, next));
};

/**
 * update - update a <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.update = function (req, res, next) {
  if (req.body.id != null) {
    delete req.body.id;
  }
  var <%= name %> = new <%= upCaseName %>(req.body);
  <%= name %>.update ({ id : req.params.id })
  .then (function (<%= name %>s) {
    res.json (<%= name %>s);
    next();
  })
  .catch (error.handleRequestError(req, res, next));
};

/**
 * remove - remove a <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.remove = function (req, res, next) {
  var <%= name %> = new <%= upCaseName %>();
  <%= name %>.remove ({ id : req.params.id })
  .then (function () {
    res.send(200);
    next();
  })
  .catch (error.handleRequestError(req, res, next));
};
