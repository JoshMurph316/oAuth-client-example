const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OpenIdStrategy = require('passport-openidconnect').Strategy;
const keys = require('./keys');

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
        issuer: 'http://localhost:8080/openid-connect-server-webapp/',
        clientID: keys.openID.clientID,
        clientSecret: keys.openID.clientSecret,
        authorizationURL: 'http://localhost:8080/openid-connect-server-webapp/authorize',
        userInfoURL: 'http://localhost:8080/openid-connect-server-webapp/userinfo',
        tokenURL: 'http://localhost:8080/openid-connect-server-webapp/token',
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