'use strict';

var Mongo = require('mongodb'),
    async = require('async');

function Message(senderId, receiverId, message){
  this.senderId   = senderId;
  this.receiverId = receiverId;
  this.body       = message;
  this.date       = new Date();
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

Message.messages = function(receiverId, cb){
  var _id = Mongo.ObjectID(receiverId);
  Message.collection.find({receiverId:_id}).toArray(function(err, messages){
    async.map(messages, iterator, cb);
  });
};

Message.send = function(senderId, receiverId, message, cb){
  var m = new Message(senderId, receiverId, message);
  Message.collection.save(m, cb);
};

module.exports = Message;

function iterator(msg, cb){
  require('./user').findById(msg.senderId, function(err, sender){
    msg.sender = sender;
    cb(null, msg);
  });
}


