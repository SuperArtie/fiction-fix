'use strict';

var Mongo = require('mongodb');

function Proposal(o){
  this.senderId = o.senderId;
  this.receiverId = o.receiverId;
  this.reply = o.reply;
  this.body = o.body;
  this.date = new Date();
}

Object.defineProperty(Proposal, 'collection', {
  get: function(){return global.mongodb.collection('proposals');}
});

Proposal.create = function(o, cb){
  var a = new Proposal(o);
  Proposal.collection.save(a, cb);
};

Proposal.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Proposal.collection.findOne({_id:_id}, cb);
};

Proposal.all = function(cb){
  Proposal.collection.find().toArray(cb);
};

module.exports = Proposal;

