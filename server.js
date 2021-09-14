'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require('axios');
require('dotenv').config();
const weatherData = require('./data/weather.json');
const { query } = require('express');
const PORT = process.env.PORT;
const movie = process.env.MOVIE_API_KEY;



let handleLiveWeather = async (req, res) => {
    let lon = req.query.lon
    let lat = req.query.lat
    let liveUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`
    let liveWeather = await axios.get(liveUrl);
    let LiveData = liveWeather.data.data;
    let needetData = LiveData.map(item => {
        let date = item.datetime;
        let description = item.weather.description;
        return new foreCast(date, description)
    });
    res.status(200).json(needetData);
}


app.get('/weatherData', handleLiveWeather);



class foreCast {
    constructor(date, description) {

        this.date = date,
            this.description = description
    }
};

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

app.listen(PORT)
class foreCastMovies {
    constructor(title, overview) {
        this.title = title;
        this.overview = overview;
    }
}

app.get('/movies', handleMovies)