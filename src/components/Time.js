import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const Time = ({ data }) => {
    const [date, setDate] =  useState(null);
    const [weekday, setWeekday] = useState(null);
    const [clock, setClock] = useState(null);

    const updateTime = () => {
        const date = moment().tz(data.timezone).format('YYYY MMMM DD');
        setDate(date);

        const weekday = moment().tz(data.timezone).format('dddd');
        setWeekday(weekday);

        const clock = moment().tz(data.timezone).format('HH:mm:ss')
        setClock(clock);
    };

    // const updateTime = useCallback(() => {
    //     const date = moment().tz(data.timezone).format('YYYY MMMM DD');
    //     setDate(date);

    //     const weekday = moment().tz(data.timezone).format('dddd');
    //     setWeekday(weekday);

    //     const clock = moment().tz(data.timezone).format('HH:mm:ss')
    //     setClock(clock);
    // }, [])


    useEffect(() => {
        const tick = setInterval(updateTime, 1000);
        return () => clearInterval(tick);
    }, [data.isSubmit]);

    return (
        <div>
            <p>{date}</p>
            <p>{weekday}</p>
            <p>{clock}</p>
        </div>
    )
}

export default Time;