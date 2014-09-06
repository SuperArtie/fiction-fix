'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    security       = require('../lib/security'),
    flash          = require('connect-flash'),
    passport       = require('passport'),
    passportConfig = require('../lib/passport/config'),
    debug          = require('../lib/debug'),
    home           = require('../controllers/home'),
    gifts           = require('../controllers/gifts'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));
  app.use(flash());
  passportConfig(passport, app);


  app.use(security.locals);
  app.use(debug.info);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  //app.post('/login', users.authenticate);
  app.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged in!', failureFlash:'Incorrect email/password'}));

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged with Twitter!', failureFlash:'Failed to login through Twitter'}));

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged with Facebook!', failureFlash:'Failed to login through Facebook'}));

  app.get('/auth/google', passport.authenticate('google',  {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
  app.get('/auth/google/callback', passport.authenticate('google', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged with Google!', failureFlash:'Failed to login through Google'}));


  app.use(security.bounce);
  app.delete('/logout', users.logout);
  app.get('/edit', users.edit);
  app.put('/user', users.update);
  app.get('/browse', users.browse);
  app.get('/dashboard', users.dashboard);
  app.get('/profile/:email', users.show);
  app.get('/gift/:id', gifts.index);
  app.post('/purchase/:receiverId/:itemId', gifts.purchase);

  app.post('/wink', users.wink);

  console.log('Express: Routes Loaded');
};

