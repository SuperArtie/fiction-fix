'use strict';

var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy,
    User            = require('../../models/user'),
    config          = require('../../../config'),
    google         = new GoogleStrategy(
                    {
                      clientID     : config.google.clientId,
                      clientSecret : config.google.clientSecret,
                      callbackURL  : config.google.callbackURL
                    },
                    User.googleAuthenticate);

module.exports = google;
