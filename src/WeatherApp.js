import React, { Component } from 'react'
import {view as WeatherHeader} from './WeatherHeader'
import {view as WeatherPanel} from './WeatherPanel'
import './WeatherApp.css'

class WeatherApp extends Component {	
  render() {
    return (
      <div className="weather-app">
      	<WeatherHeader />
        <WeatherPanel /> 
      </div>      
    );
  }
}

export default WeatherApp;
