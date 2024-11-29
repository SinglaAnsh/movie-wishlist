const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User'); // Define your User model

passport.use(new LocalStrategy(User.authenticate()));

passport.use(new GitHubStrategy({
ClientId: "Iv23liX5GAqpGwsTN7xh",
ClientSecret: "7c8ca37e6c00fa07448d13a18b3f125e62cf329a",
CallbackUrl: "http://localhost:3000/github/callback",

}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = new User({ username: profile.username, githubId: profile.id });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err);
    }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
