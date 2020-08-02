import React from 'react';
import { Link } from 'react-router-dom';

import './Settings.css'

const Settings = ({ data, handleSubmit, handleInputChange }) => {
    return (
        <div className='Settings'>
            <div className='Switch'>
                <Link to='/'>DASHBOARD</Link> <br />
            </div>
            Settings
            <div>
                Time
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='timezone'
                        value={data.timezone}
                        onChange={handleInputChange}
                    /> <button>save</button> <br />
                    https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
                </form>
            </div>
            <div>
                Weather
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='city'
                        value={data.city}
                        onChange={handleInputChange}
                    /> <button>save</button>
                </form>
            </div>
            <div>
                Public transport
                <form onSubmit={handleSubmit}>
                    <input type='text' /> <button>save</button>
                </form>
            </div>
        </div>
    )
}

export default Settings;