'use strict';

var bcrypt = require('bcrypt'),
    _      = require('underscore-contrib'),
    Mongo  = require('mongodb');

function User(){

}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

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

User.authenticate = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(user);
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
    dashboard.messages = messages;
    //proposals
    require('./proposal').proposals(self._id, function(err, proposals){
      dashboard.proposals = proposals;
      //gifts
      require('./gift').gifts(self._id, function(err, gifts){
        dashboard.gifts = gifts;
        //winks
        require('./wink').winks(self._id, function(err, winks){
          dashboard.winks = winks;
          cb(err, dashboard);
        });
      });
    });
  });
};


module.exports = User;

