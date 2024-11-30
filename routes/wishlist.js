const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); 

// Get all wishlist items for the logged-in user
router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }

    Movie.find({ addedBy: req.user._id })
        .then(movies => res.render('wishlist', { movies }))
        .catch(err => res.status(500).send(err));
});

// Add a movie to the wishlist
router.post('/add', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }

    const { title, description, releaseYear, genre } = req.body;
    const newMovie = new Movie({
        title,
        description,
        releaseYear,
        genre,
        addedBy: req.user._id,
    });

    newMovie.save()
        .then(() => res.redirect('/wishlist'))
        .catch(err => res.status(500).send(err));
});

// Remove a movie from the wishlist
router.post('/remove/:id', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }

    Movie.findOneAndDelete({ _id: req.params.id, addedBy: req.user._id })
        .then(() => res.redirect('/wishlist'))
        .catch(err => res.status(500).send(err));
});

module.exports = router;
