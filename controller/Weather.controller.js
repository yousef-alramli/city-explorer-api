"use strict";
const axios = require('axios');
const foreCast = require('../models/Weather.model')
let WeatherCache = require('../caching/WeatherCache')

let cacheDate = new Date()
let cache = new WeatherCache();

let handleLiveWeather = async (req, res) => {
    let lon = req.query.lon
    let lat = req.query.lat
    let liveUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`

    if (cache.data.length > 0 && cache.date.getHours() === cacheDate.getHours()) {
        res.json(cache.data)
    } else {
        let liveWeather = await axios.get(liveUrl);
        let LiveData = liveWeather.data.data;
        let needetData = LiveData.map(item => {
            let date = item.datetime;
            let description = item.weather.description;
            return new foreCast(date, description)
        });
        cache.date=cacheDate;
        cache.data=needetData;
        res.status(200).json(needetData);
    }
}

module.exports = handleLiveWeather;