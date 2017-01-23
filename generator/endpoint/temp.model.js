'use strict';

var lussandra   = require ('lussandra-odm').client;
var uuid        = require ('node-uuid');

var <%= upCaseName %>Model = lussandra.model ({
  id : {
    type : lussandra.types.UUID,
    key_type : lussandra.types.PRIMARY_KEY,
    key_order : 0
  },
  name : { type : lussandra.types.TEXT },
  active : {
    type : lussandra.types.BOOLEAN,
    key_type : lussandra.types.INDEX 
  }
}, {
  tableName : '<%= name %>',
  pre : function (obj) {
    if(obj.isNew) {
      obj.id = uuid.v4();
      obj.created = lussandra.types.getTimeUuid().now();
    }

    obj.accessed = lussandra.types.getTimeUuid().now();
  },
  post : function (obj) {

  }
});

lussandra.sync (<%= upCaseName %>Model);

module.exports = <%= upCaseName %>Model;
