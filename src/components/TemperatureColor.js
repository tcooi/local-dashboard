import React from 'react';

const TemperatureColor = ({temperature}) => {
    let color = {

    };
    let l;

    if (temperature > 0) {
        if (temperature > 40) {
            l = 65;
        } else {
            l = 100 - (temperature * 0.875);
        }
        color.backgroundColor = `hsl(358, 98%, ${l}%)`
    } else {
        if (temperature < -40) {
            l = 65;
        } else {
            l = 100 - (Math.abs(temperature) * 0.875);
        }
        color.backgroundColor = `hsl(202, 98%, ${l}%)`
    }

        //clip-path
    //hsl(358, 98%, 65%) red +40
    //hsl(202, 98%, 65%) blue -40

    return (
        <div style={color}>
            {temperature}
        </div>
    )
}

export default TemperatureColor;