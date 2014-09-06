'use strict';

var FacebookStrategy  = require('passport-facebook').Strategy,
    User            = require('../../models/user'),
    config          = require('../../../config'),
    facebook         = new FacebookStrategy(
                    {
                      clientID     : config.facebook.clientId,
                      clientSecret : config.facebook.clientSecret,
                      callbackURL  : config.facebook.callbackURL
                    },
                    User.facebookAuthenticate);

module.exports = facebook;
