"use strict"
const axios = require('axios');
const foreCastMovies = require('../models/Movie.model')
const movie = process.env.MOVIE_API_KEY;
let Cache = require('../caching/MovieCache');
const { response } = require('express');

let cacheDate=new Date()
let cache = new Cache();
let handleMovies = async (req, res) => {
    let query = req.query.query;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movie}&query=${query}`;

    let topMovies = [];
    console.log("cache date",cache.date.getHours());

    if (cache.data.length > 0 && cache.date.getHours()===cacheDate.getHours()) {
        res.json({ 'data': cache, 'meesage': 'data came from cache' })
    } else {
        topMovies = await axios.get(movieUrl);
        
            let MoviesData = topMovies.data.results;
            let wantedMovie = MoviesData.map(item => {
                let title = item.title;
                let overview = item.overview;
                return new foreCastMovies(title, overview)

            });
            cache.date=cacheDate;
            res.status(200).json(wantedMovie);
            cache.data= wantedMovie;
            

    }

}

module.exports = handleMovies;