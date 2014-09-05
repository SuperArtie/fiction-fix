'use strict';

var Mongo = require('mongodb'),
    async = require('async');

function Wink(o){
  this.senderId   = o.senderId;
  this.receiverId = o.receiverId;
}

Object.defineProperty(Wink, 'collection', {
  get: function(){return global.mongodb.collection('winks');}
});

Wink.create = function(o, cb){
  var a = new Wink(o);
  Wink.collection.save(a, cb);
};

Wink.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Wink.collection.findOne({_id:_id}, cb);
};

Wink.all = function(cb){
  Wink.collection.find().toArray(cb);
};

Wink.winks = function(receiverId, cb){
  var _id = Mongo.ObjectID(receiverId);
  Wink.collection.find({receiverId:_id}).toArray(function(err, winks){
    async.map(winks, iterator, cb);
  });
};

module.exports = Wink;

function iterator(wink, cb){
  require('./user').findById(wink.senderId, function(err, sender){
    wink.sender = sender;
    cb(null, wink);
  });
}
