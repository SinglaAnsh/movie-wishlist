require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const hbs = require('hbs');

// Models and Routes
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');
const indexRouter = require('./routes/index');

// App setup
const app = express();

// Set the view engine to Handlebars (hbs)
app.set('view engine', 'hbs');

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

// MongoDB connection
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Ansh:Anshsingla12@cluster0.um0v8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "e572eb2d0cc5e25002098ec3705af6026b499b175d02a53ef0282021ae2f0e85", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/wishlist', wishlistRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
