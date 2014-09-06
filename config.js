'use strict';

var config = {};

config.stripe = {
                  publishKey : 'pk_test_VcTMXoO0qK8DOVJ8PViVGhT6',
                  secretKey  : process.env.STRIPE_SECRET
                };

module.exports = config;
