'use strict';

var Mongo = require('mongodb'),
    twilio  = require('twilio'),
    async = require('async');

function Proposal(senderId, receiverId, o){
  this.senderId = senderId;
  this.receiverId = receiverId;
  this.isAccepted = false;
  this.body = o.message;
  this.dateProposed = new Date(o.dateProposed);
  this.date = new Date();
  this.isRead = false;
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

Proposal.proposals = function(receiverId, cb){
  var _id = Mongo.ObjectID(receiverId);
  Proposal.collection.find({receiverId:_id}).toArray(function(err, proposals){
    async.map(proposals, iterator, cb);
  });
};

Proposal.send = function(senderId, receiverId, message, cb){
  var m = new Proposal(senderId, receiverId, message);
  Proposal.collection.save(m, cb);
};

Proposal.read = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Proposal.collection.findAndModify({_id:_id}, [], {$set:{isRead:true}}, function(err, prop){
    iterator(prop, cb);
  });
};

Proposal.response = function(propId, obj, cb){
  Proposal.findById(propId, function(err, prop){
    var receiverId =  prop.receiverId.toString();
    require('./user').findById(receiverId, function(err, receiver){
      var message = (obj.propAccepted === 'no') ? 'Sorry, your proposal to ' + receiver.email + ' has been declined. There are plenty of other cartoons in the sea!' : 'Your proposal for a date from ' + receiver.email + ' has been accepted. Text this person at: ' + receiver.phone + ' or log on to FictionFix and send them a message!';
      //var accepted = (obj.propAccepted === 'no  ') ? 'Sorry, your date proposal to ' + receiver.email + ' was not accepted.'  : 'Woohoo! Your date proposal to ' + receiver.email + ' was accepted!';
     sendText(receiver.phone, message, cb);
           //require('./message').send(prop.receiverId, prop.senderId, accepted, cb);
    });
  });
};

module.exports = Proposal;

function iterator(prop, cb){
  require('./user').findById(prop.senderId, function(err, sender){
    prop.sender = sender;
    cb(null, prop);
  });
}


function sendText(to, body, cb){
  if(!to){return cb();}


  var accountSid = process.env.TWSID,
      authToken  = process.env.TWTOK,
      from       = process.env.FROM,
      client     = twilio(accountSid, authToken);

  client.messages.create({to:to, from:from, body:body}, cb);
}

