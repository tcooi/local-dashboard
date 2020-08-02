import React, { useState, useEffect } from 'react';
import schedule from 'node-schedule';
import moment from 'moment-timezone';

import './WeatherDay.css'

//show the weather for next few hours
const WeatherDay = ({ data }) => {
    const [weather, setWeather] = useState(null);

    //return forecasts for now and next 24 hours
    //todo make so time is not dependent on chosen timezon, should be from chosen city
    //24 hour forecast is wrong when timezone and city are different
    const trimForecasts = (forecasts) => {
        const currentTime = moment().tz(data.timezone).format();
        const currentTimeStop = moment().tz(data.timezone).add(24, 'hours').format();

        const trimmed = forecasts.filter((item, i) => {
            return item.utcTime >= currentTime && item.utcTime <= currentTimeStop && i % 2;
        });

        console.log(currentTime);
        return trimmed;
    }

    const hourlyWeather = async () => {
        try {
            const weatherData = await fetch(`https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=${process.env.REACT_APP_HERE_KEY}&product=forecast_hourly&name=${data.city}`);
            const weatherJson = await weatherData.json();

            const trimmedWeather = trimForecasts(weatherJson.hourlyForecasts.forecastLocation.forecast);
            setWeather(trimmedWeather);

            console.log('weather hourly data updated');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        hourlyWeather();
        //fetch weather data every hour
        schedule.scheduleJob('0 * * * *', () => {
            hourlyWeather();
        });

    }, [data.isSubmit]);

    return (
        <div className='Weather-day'>
            <div className='day-title'>
                Forecast for the next 24 hours
            </div>
            <div className='day-row'>
                {weather && weather.map(item => (
                    <div key={item.utcTime} className='day-row-item'>
                        {moment(item.utcTime).tz(data.timezone).format('HH:mm')} <br />
                        {item.temperature}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default WeatherDay;