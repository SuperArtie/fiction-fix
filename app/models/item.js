'use strict';

var Mongo = require('mongodb');

function Item(){
}

Object.defineProperty(Item, 'collection', {
  get: function(){return global.mongodb.collection('items');}
});

Item.all = function(cb){
  Item.collection.find().toArray(cb);
};

module.exports = Item;

