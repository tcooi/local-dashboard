import React from 'react';
import TemperatureColor from './TemperatureColor';

import './PublicTransport.css'

const PublicTransport = ({ test }) => {
    const temperature = -5;
    return (
        <div className='public-transport'>
            Public transport here {test} <br />
            <TemperatureColor temperature={temperature} />
        </div>
    )
}

export default PublicTransport;