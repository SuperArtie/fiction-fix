'use strict';

var config = {};

config.stripe = {
                  publishKey : 'pk_test_VcTMXoO0qK8DOVJ8PViVGhT6',
                  secretKey  : process.env.STRIPE_SECRET
                };

config.twitter = {
  apiKey      : 'LNfG2qlieNXHUEPrXx8bcEeiq',
  apiSec      : process.env.TWITTER_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/twitter/callback'
};

config.facebook = {
  clientId    : '344026865773316',
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/facebook/callback'
};

config.google = {
  clientId    : '75269371673-d5pes8pmg7t39s5q4v88rjaulne52ltg.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/google/callback'
};

module.exports = config;
