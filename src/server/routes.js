/**
 * Main application routes
 */

'use strict';

module.exports = function(api) {

    // Insert routes below
    require('v/1/todos')(api);
   
    //************* health check api ************//
    api.get('v/1/status', function(req, res) {
        res.send(200);
    })
};
