const router = require('express').Router();
const passport = require('passport');
const resources = require('../config/resources');

// app routing
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});
router.get('/logout', (req, res) => {
    res.send('logging out');
});


// oAuth routing: google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));
router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res) => {
    res.json(resources);
});


// oAuth routing: openID Connect
router.get('/openid', passport.authenticate('openidconnect', {
    scope: ['profile', 'email']
}));
router.get('/openid/redirect', passport.authenticate('openidconnect', { session: false }), (req, res) => {
    res.json(resources);
});


module.exports = router;