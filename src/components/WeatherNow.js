import React, { useState, useEffect } from 'react';
import schedule from 'node-schedule';

import './WeatherNow.css';

//show the current weather
const WeatherNow = ({ data }) => {
    const [weather, setWeather] = useState({
        location: '',
        observation: {}
    });

    const currentWeather = async () => {
        try {
            const weatherData = await fetch(`https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=${process.env.REACT_APP_HERE_KEY}&product=observation&name=${data.city}`);
            const weatherJson = await weatherData.json();

            setWeather(() => ({
                location: `${weatherJson.observations.location[0].city}, ${weatherJson.observations.location[0].country}`,
                observation: weatherJson.observations.location[0].observation[0]
            }));

            console.log('weather now data updated')
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        currentWeather();
        //fetch weather data every hour
        schedule.scheduleJob('0 * * * *', () => {
            currentWeather();
        });
    }, [data.isSubmit]);

    return (
        <div className='WeatherNow'>
            <div>
                <div className='Title'>
                    Weather in {weather.location}
                </div>
                <div className='Now-temperature'>
                    {parseFloat(weather.observation.temperature).toFixed(1)} °C, feels like {parseFloat(weather.observation.comfort).toFixed(1)} °C <br />
                </div>
                <div className='Now-description'>
                    {weather.observation.description} <br />
                </div>
            </div>
        </div>
    );
}

export default WeatherNow;