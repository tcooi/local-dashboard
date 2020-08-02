import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

	const test1 = 'testa'

	const handleSubmit = (e) => {
		e.preventDefault();
		setData(prevData => ({
			...prevData,
			isSubmit: !prevData.isSubmit
		}))
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setData(prevData => ({
			...prevData,
			[name]: value
		}))
	}

	return (
		<Router>
			<div className="App">
				<Time data={data} />
				<Weather data={data} />
				<Route exact path='/public-transport' render={(props) => <PublicTransport {...props} test={test1} />} />
				<Settings data={data} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
			</div>
		</Router>
	);
}

export default App;
