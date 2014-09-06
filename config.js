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

module.exports = config;
