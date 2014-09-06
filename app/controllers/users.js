'use strict';

var User = require('../models/user'),
    mp   = require('multiparty');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.edit = function(req, res){
  res.render('users/edit');
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.update = function(req, res){
  res.locals.user.save(req.body, function(){
    res.redirect('/dashboard');
  });
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.dashboard = function(req, res){
  res.locals.user.dashboard(function(err, dashboard){
    res.render('users/dashboard', {messages:dashboard.messages, winks:dashboard.winks, gifts:dashboard.gifts, proposals:dashboard.proposals});
  });
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

exports.browse = function(req, res){
  User.collection.find({isPublic:true}).toArray(function(err, users){
    res.render('users/browse', {users:users});
  });
};

exports.show = function(req,res){
  User.findOne({email:req.params.email}, function(err, client){
    res.render('users/show', {client:client});
  });
};

exports.wink = function(req, res){
  require('../models/wink').create(req.user._id, req.body.receiverId, function(){
    User.findById(req.body.receiverId, function(err, receiver){
      res.redirect('/profile/'+receiver.email);
    });
  });
};

exports.photos = function(req, res){
  res.render('users/photos');
};

exports.addPhotos = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    console.log('FIELDS------', fields);
    console.log('FILES------', files);
    res.locals.user.addPhotos(files, function(){
      req.flash('success', 'You uploaded some photos!');
      res.redirect('/photos');
    });
  });
};

exports.makePrimary = function(req, res){
  res.locals.user.primaryPhoto = req.body.primaryPhoto;
  User.collection.save(res.locals.user, function(){
    req.flash('success', 'You have updated your profile picture!');
    res.redirect('/dashboard');
  });
};


