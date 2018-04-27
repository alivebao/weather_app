import React, { Component } from 'react'
import WeatherHeader from './WeatherHeader'
import WeatherPanel from './WeatherPanel'
import './WeatherApp.css'

class WeatherApp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedLocationId: 1
		}

		this.locationIdUpdate = this.locationIdUpdate.bind(this)
	}

	locationIdUpdate(locationId) {
		this.setState({
			selectedLocationId: locationId
		})
	}
  render() {
    return (
      <div className="weather-app">
      	<WeatherHeader selectedId={this.state.selectedLocationId} updateLocationId={this.locationIdUpdate}/>
        <WeatherPanel selectedId={this.state.selectedLocationId} /> 
      </div>      
    );
  }
}

export default WeatherApp;
