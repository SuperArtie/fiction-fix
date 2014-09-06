'use strict';

var User = require('../models/user');

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
  User.all(function(err, users){
    res.render('users/browse', {users:users});
  });
};

exports.show = function(req,res){
  User.findOne({email:req.params.email}, function(err, user){
    res.render('users/show', {user:user});
  });
};
