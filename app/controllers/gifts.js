'use strict';
var config = require('../../config'),
    Item = require('../models/item'),
    User = require('../models/user'),
    Gift = require('../models/gift');

exports.index = function(req, res){
  Item.all(function(err,items){
    res.render('gifts/index', {items:items, receiverId:req.params.id, key: config.stripe.publishKey});
  });
};

exports.purchase = function(req, res){
  var stripe      = require('stripe')(config.stripe.secretKey),
    stripeToken = req.body.stripeToken;
  console.log('~~~~~~~~~~~~'+req.session.user);
  Item.findById(req.params.itemId, function(err, item){
    stripe.charges.create({
      amount: (item.price * 100),
      currency: 'usd',
      card: stripeToken,
      description: req.body.stripeEmail || 'anonymous'
    }, function(err, charge){
      req.session.save(function(){
        Gift.create(item._id, res.locals.user._id, req.params.receiverId, function(){
          User.findById(req.params.receiverId, function(err, user){
            req.flash('success', 'Congratulations, you just purchased a gift!');
            res.redirect('/profile/'+ user.email);
          });
        });
      });
    });
  });
};


