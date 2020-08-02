import React from 'react';

const Settings = ({ data, handleSubmit, handleInputChange }) => {
    return (
        <div>
            Settings
            <div>
                Time
                <form onSubmit={handleSubmit}>

                    <input type='text' name='timezone' value={data.timezone} onChange={handleInputChange}/> <button>save</button>
                </form>
            </div>
            <div>
                Weather
                <form onSubmit={handleSubmit}>

                    <input type='text' name='city' value={data.city} onChange={handleInputChange}/> <button>save</button>
                </form>
            </div>
            <div>
                Public transport
                <form onSubmit={handleSubmit}>

                    <input type='text'/> <button>save</button>
                </form>
            </div>
        </div>
    )
}

export default Settings;