const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OpenIdStrategy = require('passport-openidconnect').Strategy;
const keys = require('./config/keys');

// passport.serializeUser((user, done));

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
    })
);

passport.use(new OpenIdStrategy({
    issuer: 'http://cd2api:8080/openid-connect-server-webapp/',
    clientID: keys.openID.clientID,
    clientSecret: keys.openID.clientSecret,
    authorizationURL: 'http://cd2api:8080/openid-connect-server-webapp/authorize',
    userInfoURL: 'http://cd2api:8080/openid-connect-server-webapp/userinfo',
    tokenURL: 'http://cd2api:8080/openid-connect-server-webapp/token',

    // full redirect url: http://cd2api:3000/auth/openid/redirect
    callbackURL: '/auth/openid/redirect'
    }, (req, issuer, userId, profile, accessToken, refreshToken, params, done) => {
        console.log('issuer:', issuer);
        console.log('userId:', userId);
        console.log('accessToken:', accessToken);
        console.log('refreshToken:', refreshToken);
        console.log('params:', params);
      
        return done(null, profile);
    })
);