const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');  // Example movie model

// Get all wishlist items
router.get('/', (req, res) => {
    Movie.find({ user: req.user._id })
        .then(movies => res.render('wishlist', { movies }))
        .catch(err => res.status(500).send(err));
});

// Add movie to wishlist
router.post('/add', (req, res) => {
    const newMovie = new Movie({
        title: req.body.title,
        user: req.user._id
    });

    newMovie.save()
        .then(() => res.redirect('/wishlist'))
        .catch(err => res.status(500).send(err));
});

// Remove movie from wishlist
router.post('/remove/:id', (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/wishlist'))
        .catch(err => res.status(500).send(err));
});

module.exports = router;
