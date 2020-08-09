import React, { useState, useEffect } from 'react';
import schedule from 'node-schedule';

import TemperatureColor from './TemperatureColor';

import './WeatherWeek.css';

//show weather for coming days
const WeatherWeek = ({ data }) => {
    const [weather, setWeather] = useState([]);

    //check for rain or snow, set anyPrecipitation to whatever have value
    const setPrecipitation = (forecasts) => {
        forecasts.forEach(item => {
            if (item.rainFall === '*' && item.snowFall === '*') {
                item.anyPrecipitation = 0;
            } else if (item.rainFall === '*') {
                item.anyPrecipitation = item.snowFall;
            } else {
                item.anyPrecipitation = item.rainFall;
            }
        });
        return forecasts;
    }

    const formatForecasts = (forecasts) => {
        forecasts.forEach(item => {
            item.highTemperature = parseFloat(item.highTemperature).toFixed(1);
            item.lowTemperature = parseFloat(item.lowTemperature).toFixed(1);
        });
        return forecasts;
    }

    const weeklyWeather = async () => {
        const weatherData = await fetch(`https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=${process.env.REACT_APP_HERE_KEY}&product=forecast_7days_simple&name=${data.city}`);
        const weatherJson = await weatherData.json();

        const precipitation = setPrecipitation(weatherJson.dailyForecasts.forecastLocation.forecast);
        const formatted = formatForecasts(precipitation);

        setWeather(formatted);
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
                    <div key={item.utcTime} className='week-row-item'>
                        <div className='week-row-item-title'>
                            {item.weekday} <br />
                        </div>
                        <div className='week-row-item-data'>
                            <TemperatureColor temperature={item.highTemperature} />
                        </div>
                        <div className='week-row-item-data'>
                            <TemperatureColor temperature={item.lowTemperature} />
                        </div>
                        {item.anyPrecipitation}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherWeek;