import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
		const { name, value } = e.target;
		setData(prevData => ({
			...prevData,
			[name]: value
		}))
	}

	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route
						exact path='/'
						render={(props) => (
							<div>
								<div className='Switch'>
									<Link to='/settings'>SETTINGS</Link> <br />
								</div>
								<Time {...props} data={data} />
								<Weather {...props} data={data} />
								<PublicTransport />
							</div>
						)}
					/>
					<Route
						exact path='/settings'
						render={(props) => (
							<Settings {...props} data={data} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
						)}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
