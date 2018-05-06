import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherApp from './WeatherApp';
import store from './Store.js'
import Provider from './Provider'

ReactDOM.render(
	<Provider store={store}>
		<WeatherApp />
	</Provider>, 
	document.getElementById('root')
)
