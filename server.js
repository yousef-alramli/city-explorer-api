'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherData = require('./data/weather.json')
const PORT = process.env.PORT;

app.get('/weatherData', (req, res) => {
    let amman = weatherData[2];
    let city_name = amman.city_name;
    let lat = Number(amman.lat);
    let lon = Number(amman.lon);
    let latQuery = req.query.lat;
    let lonQuery = req.query.lon;

    

    let city = weatherData.find(item =>{
       return latQuery == item.lat && lonQuery == item.lon;

    })
console.log();
   
let foreCast= city.data.map(info=>{
    return{
        date:info.valid_date ,
    description:info.weather.description
}
})
res.status(200).send(foreCast);
});

app.listen(PORT, () => {
    console.log(`hello warld ${PORT}`);
});


