import React from 'react';
import WeatherNow from './WeatherNow';
import WeatherDay from './WeatherDay';
import WeatherWeek from './WeatherWeek';

import './Weather.css'

const Time = ({ data }) => {
    return (
        <div className='Weather'>
            <WeatherNow data={data}/>
            <WeatherDay data={data}/>
            <WeatherWeek data={data}/>
        </div>
    )
}

export default Time;