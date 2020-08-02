import React, { useState, useEffect } from 'react';
import schedule from 'node-schedule';

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
        <div>
            Weather Week <br />
            <div>
                {weather && weather.map(item => (
                    <div key={item.utcTime}>
                        {item.weekday} <br />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherWeek;