import React, { useState, useEffect } from 'react';
import schedule from 'node-schedule';

import './WeatherWeek.css';

//show weather for coming days
const WeatherWeek = ({ data }) => {
    const [weather, setWeather] = useState([]);

    const weeklyWeather = async () => {
        const weatherData = await fetch(`https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=${process.env.REACT_APP_HERE_KEY}&product=forecast_7days_simple&name=${data.city}`);
        const weatherJson = await weatherData.json();

        setWeather(weatherJson.dailyForecasts.forecastLocation.forecast)
        console.log(`weather weekly data updated`);
    }

    useEffect(() => {
        weeklyWeather();
        //fetch weather data every hour
        schedule.scheduleJob('0 * * * *', () => {
            weeklyWeather();
        });

    }, [data.isSubmit]);

    return (
        <div className='weather-week'>
            <div className='week-title'>
                Forecast for the next 7 days
            </div>
            <div className='week-row'>
                {weather && weather.map(item => (
                    <div key={item.utcTime} className='week-item'>
                        {item.weekday} <br />
                        {item.highTemperature} <br />
                        {item.lowTemperature}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherWeek;