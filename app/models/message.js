'use strict';

var Mongo = require('mongodb');

function Message(o){
  this.senderId   = o.senderId;
  this.body       = o.body;
  this.receiverId = o.receiverId;
  this.time       = new Date();
}

Object.defineProperty(Message, 'collection', {
  get: function(){return global.mongodb.collection('messages');}
});

Message.create = function(o, cb){
  var a = new Message(o);
  Message.collection.save(a, cb);
};

Message.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Message.collection.findOne({_id:_id}, cb);
};

Message.all = function(cb){
  Message.collection.find().toArray(cb);
};

module.exports = Message;

