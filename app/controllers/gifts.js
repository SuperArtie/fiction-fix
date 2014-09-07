'use strict';
var Item = require('../models/item'),
    User = require('../models/user');

exports.index = function(req, res){
  Item.all(function(err,items){
    res.render('gifts/index', {items:items, receiverId:req.params.id});
  });
};

exports.purchase = function(req, res){
  User.findById(req.params.receiverId, function(err, user){
    res.redirect('/profile/'+user.email);
  });
};


