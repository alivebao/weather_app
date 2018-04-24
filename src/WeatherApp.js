import React, { Component } from 'react';
import WeatherSelecter from './WeatherSelecter'
import WeatherPanel from './WeatherPanel'
import {arrLocation as LocationGroup} from './WeatherLocationGroup'

class WeatherApp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedLocation: 'undefined'
		}

		this.locationUpdate = this.locationUpdate.bind(this)
	}

	locationUpdate(locationName) {
		this.setState({
			selectedLocation: locationName
		})
	}
  render() {
    return (
      <div className="weather-app">
      	<WeatherSelecter locationGroup={LocationGroup} locationUpdate={this.locationUpdate}/>
        <WeatherPanel location={this.state.selectedLocation} /> 
        <button onClick= {() => {this.forceUpdate()}}>Force Update</button>
      </div>      
    );
  }
}

export default WeatherApp;
