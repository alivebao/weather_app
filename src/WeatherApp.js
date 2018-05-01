import React, { Component } from 'react'
import {view as WeatherHeader} from './WeatherHeader'
import {view as WeatherPanel} from './WeatherPanel'
import './WeatherApp.css'

class WeatherApp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedLocationId: 1, 
			daily: 'NA'
		}

		this.locationIdUpdate = this.locationIdUpdate.bind(this)
	}	

	locationIdUpdate(locationId, dailyInfo) {
		this.setState({
			daily: dailyInfo, 
			selectedLocationId: locationId
		})
	}
	
  render() {
    return (
      <div className="weather-app">
      	<WeatherHeader selectedId={this.state.selectedLocationId} udpateWeatherInfo={this.locationIdUpdate}/>
        <WeatherPanel dailyInfo={this.state.daily} selectedId={this.state.selectedLocationId} /> 
      </div>      
    );
  }
}

export default WeatherApp;
