'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const handleLiveWeather = require('./controller/Weather.controller');
const handleMovies = require('./controller/Movie.controller')
const PORT = process.env.PORT;


app.listen(PORT)

app.get('/weatherData', handleLiveWeather);

app.get('/movies', handleMovies)







