import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

import './Time.css';

const Time = ({ data }) => {
    const [date, setDate] = useState(null);
    const [weekday, setWeekday] = useState(null);
    const [clock, setClock] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const updateTime = () => {
        const date = moment().tz(data.timezone).format('YYYY MMMM DD');
        setDate(date);

        const weekday = moment().tz(data.timezone).format('dddd');
        setWeekday(weekday);

        const clock = moment().tz(data.timezone).format('HH:mm');
        setClock(clock);

        const seconds = moment().tz(data.timezone).format(':ss');
        setSeconds(seconds);
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
        <div className='Time'>
            <div className='time-date-weekday'>
                <div className='Time-date'>
                    {date}
                </div>
                <div className='Time-weekday'>
                    {weekday}
                </div>
            </div>
            <div className='Time-clock'>
                <div>
                    {clock}
                </div>
                <div className='time-clock-seconds'>
                    {seconds}
                </div>
            </div>
        </div>
    )
}

export default Time;