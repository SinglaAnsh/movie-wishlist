const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login route
router.get('/login', (req, res) => res.render('login'));

// Local login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/wishlist',
    failureRedirect: '/auth/login',
}));

// GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: '/wishlist',
    failureRedirect: '/auth/login',
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
