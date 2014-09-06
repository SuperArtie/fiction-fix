'use strict';

var Mongo = require('mongodb'),
    _ = require('underscore-contrib');

function Item(){
}

Object.defineProperty(Item, 'collection', {
  get: function(){return global.mongodb.collection('items');}
});

Item.all = function(cb){
  Item.collection.find().toArray(cb);
};

Item.findById = function(id, cb){
  var _id = Mongo.ObjectID(id); //turns id string into mongo id
  Item.collection.findOne({_id:_id}, function(err, obj){  //mongo method findOne
    var item = Object.create(Item.prototype); //make new object from user.protot
    item = _.extend(item, obj); //take all object props and put them on user
    cb(err, item);
  });
};
module.exports = Item;

