import React, { useState, useEffect } from 'react';
import schedule from 'node-schedule';
import moment from 'moment-timezone';

//show the weather for next few hours
const WeatherNow = ({ data }) => {
    const [weather, setWeather] = useState(null);

    //return forecasts for now and next 18 hours
    //todo make so time is not dependent on chosen timezon, should be from chosen city
    const trimForecasts = (forecasts) => {
        const currentTime = moment.tz(data.timezone).format();
        const currentTimeStop = moment.tz(data.timezone).add(18, 'hours').format();

        const trimmed = forecasts.filter((item, i) => {
            return item.utcTime >= currentTime && item.utcTime <= currentTimeStop && i % 2;
        });
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
        <div>
            Weather Day<br />
            <div>
                {weather && weather.map(item => (
                    <div key={item.utcTime}>
                        {item.utcTime}
                        <br />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherNow;