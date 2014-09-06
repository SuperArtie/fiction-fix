'use strict';

var Mongo = require('mongodb'),
    async = require('async');

function Gift(itemId, senderId, receiverId){
  this.itemId     = Mongo.ObjectID(itemId);
  this.senderId   = Mongo.ObjectID(senderId);
  this.receiverId = Mongo.ObjectID(receiverId);
  this.date       = new Date();
}

Object.defineProperty(Gift, 'collection', {
  get: function(){return global.mongodb.collection('gifts');}
});

Gift.create = function(itemId, senderId, receiverId, cb){
  var gift = new Gift(itemId, senderId, receiverId);
  Gift.collection.save(gift, cb);
};

Gift.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gift.collection.findOne({_id:_id}, cb);
};

Gift.all = function(cb){
  Gift.collection.find().toArray(cb);
};

Gift.gifts = function(receiverId, cb){
  var _id = Mongo.ObjectID(receiverId);
  Gift.collection.find({receiverId:_id}).toArray(function(err, gifts){
    async.map(gifts, iterator, cb);
  });
};


module.exports = Gift;

function iterator(gift, cb){
  require('./user').findById(gift.senderId, function(err, sender){
    gift.sender = sender;
    require('./item').collection.findOne({_id:gift.itemId}, function(err, item){
      gift.item = item;
      cb(null, gift);
    });
  });
}
