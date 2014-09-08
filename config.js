'use strict';

var config = {};

config.stripe = {
                  publishKey : 'pk_test_VcTMXoO0qK8DOVJ8PViVGhT6',
                  secretKey  : process.env.STRIPE_SECRET
                };

config.twitter = {
   apiKey : 'C6G4rN4eQTRNE5OIh0dPPsEeb' ,
   apiSec : process.env.TWITTER_SECRET,
   callbackURL : 'http://daniel-vm.com:3333/auth/twitter/callback'
 };

config.facebook = {
  clientId : '832554420102073',
  clientSecret : process.env.FACEBOOK_SECRET,
  callbackURL : 'http://daniel-vm.com:3333/auth/facebook/callback'
};

config.google = {
  clientId : '24882528842-ktibs3f3tdfnrcdih16mtl8cpcpdr7pm.apps.googleusercontent.com',
  clientSecret : process.env.GOOGLE_SECRET,
  callbackURL : 'http://daniel-vm.com:3333/auth/google/callback'
};

/* Nathan's
config.twitter = {
  apiKey      : 'LNfG2qlieNXHUEPrXx8bcEeiq',
  apiSec      : process.env.TWITTER_SECRET,
  callbackURL : 'http://deluxin.com:3000/auth/twitter/callback'
};

config.facebook = {
  clientId    : '338714129622471',
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL : 'http://deluxin.com:3000/auth/facebook/callback'
};

config.google = {
  clientId    : '75269371673-d5pes8pmg7t39s5q4v88rjaulne52ltg.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL : 'http://deluxin.com:3000/auth/google/callback'
};
*/
module.exports = config;


