// packages
const express   = require('express'),
passport        = require('passport'),
session         = require('express-session'),

// local files
keys            = require('./config/keys'),
passportSetup   = require('./config/passport-setup'),
authRoutes      = require('./routes/auth-routes');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// Passport requires session to persist the authentication
// so were using express-session for this example
app.use(session({
    secret: 'secret squirrel',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});