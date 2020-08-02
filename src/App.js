import React, { useState } from 'react';
import Settings from './components/Settings';
import Time from './components/Time';
import Weather from './components/Weather';
import PublicTransport from './components/PublicTransport';

import './App.css';

function App() {
	const [data, setData] = useState({
		isSubmit: false,
		timezone: 'Europe/Stockholm',
		city: 'Stockholm'
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setData(prevData => ({
			...prevData,
			isSubmit: !prevData.isSubmit
		}))
	}

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setData(prevData => ({
			...prevData,
			[name]: value
		}))
	}

	return (
		<div className="App">
			<Time data={data}/>
			<Weather data={data}/>
			<PublicTransport />
			<Settings data={data} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
		</div>
	);
}

export default App;
