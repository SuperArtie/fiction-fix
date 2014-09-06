'use strict';

var bcrypt = require('bcrypt'),
    _      = require('underscore-contrib'),
    Mongo  = require('mongodb');

function User(){

}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.all = function(cb){
  User.collection.find().toArray(cb);
};

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id); //turns id string into mongo id
  User.collection.findOne({_id:_id}, function(err, obj){  //mongo method findOne
    var user = Object.create(User.prototype); //make new object from user.protot
    user = _.extend(user, obj); //take all object props and put them on user
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    //pass to constructor
    o.loc = {};
    User.collection.save(o, cb);
  });
};
User.localAuthenticate = function(email, password, cb){
  User.collection.findOne({email:email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.twitterAuthenticate = function(token, secret, twitter, cb){
  User.collection.findOne({twitterId:twitter.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {twitterId:twitter.id, username:twitter.username, displayName:twitter.displayName, type:'twitter', loc:{}};
    User.collection.save(user, cb);
  });
};

User.facebookAuthenticate = function(token, secret, facebook, cb){
  User.collection.findOne({facebookId:facebook.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {facebookId:facebook.id, username:facebook.displayName, displayName:facebook.dispalyName, type:'facebook', loc:{}};
    User.collection.save(user, cb);
  });
};

User.prototype.save = function(o, cb){
  var properties = Object.keys(o),
      self       = this;

  properties.forEach(function(property){
    switch(property){
      case 'loc':
        self.loc = {name:o.loc[0], lat:o.loc[1], lng:o.loc[2]};
        break;
      default:
        self[property] = o[property];
    }
  });
  User.collection.save(this, cb);
};

User.prototype.dashboard = function(cb){
  //winks
  var dashboard = {},
      self      = this;
  //messages
  require('./message').messages(self._id, function(err, messages){
    dashboard.messages = messages || [];
    //proposals
    require('./proposal').proposals(self._id, function(err, proposals){
      dashboard.proposals = proposals || [];
      //gifts
      require('./gift').gifts(self._id, function(err, gifts){
        dashboard.gifts = gifts || [];
        //winks
        require('./wink').winks(self._id, function(err, winks){
          dashboard.winks = winks || [];
          cb(err, dashboard);
        });
      });
    });
  });
};

User.findOne = function(filter, cb){
  User.collection.findOne(filter, cb);
};


module.exports = User;

