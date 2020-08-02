import React from 'react';

import WeatherNow from './WeatherNow';
import WeatherDay from './WeatherDay';
import WeatherWeek from './WeatherWeek';

const Time = ({ data }) => {
    return (
        <div>
            <WeatherNow data={data}/>
            <WeatherDay data={data}/>
            <WeatherWeek data={data}/>
        </div>
    )
}

export default Time;