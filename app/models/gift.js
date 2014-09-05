'use strict';

var Mongo = require('mongodb');

function Gift(o){
  this.itemId     = o.itemId;
  this.senderId   = o.senderId;
  this.receiverId = o.receiverId;
  this.date       = new Date();
}

Object.defineProperty(Gift, 'collection', {
  get: function(){return global.mongodb.collection('gifts');}
});

Gift.create = function(o, cb){
  var a = new Gift(o);
  Gift.collection.save(a, cb);
};

Gift.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gift.collection.findOne({_id:_id}, cb);
};

Gift.all = function(cb){
  Gift.collection.find().toArray(cb);
};

module.exports = Gift;

