"use strict"
const axios = require('axios');
const foreCastMovies = require('../models/Movie.model')
const movie = process.env.MOVIE_API_KEY;

let handleMovies = async (req, res) => {
    let query = req.query.query;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movie}&query=${query}`;
    let topMovies = await axios.get(movieUrl);
    let MoviesData = topMovies.data.results;
    let wantedMovie = MoviesData.map(item => {
        let title = item.title;
        let overview = item.overview;
        return new foreCastMovies(title, overview)
    })
    res.status(200).json(wantedMovie);
}

module.exports = handleMovies;