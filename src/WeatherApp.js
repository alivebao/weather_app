import React, { Component } from 'react'
import WeatherHeader from './WeatherHeader'
import WeatherPanel from './WeatherPanel'
import {arrLocation as LocationGroup} from './WeatherLocationGroup'
import CustomConfig from './CustomConfig'
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

	locationIdUpdate(locationId) {
		let requestCode = 'NA'
		this.setState({
			daily: 'NA'
		})
		LocationGroup.forEach((val) => {
			if(val.id === locationId) {
				requestCode = val.code
			}
		})
		const requestURL = `/v3/weather/daily.json?key=${CustomConfig.key}&location=${requestCode}&language=zh-Hans&unit=c&start=0&days=3`
		fetch(requestURL)
			.then((response) => {
				if(response.status !== 200) {
					throw new Error('Fail to get response with status ' + response.status)
				}

				response.json().then((responseJSON) => {
					this.setState({
						daily: responseJSON.results[0].daily
					})
				})
			})
		this.setState({
			selectedLocationId: locationId
		})
	}

	componentDidMount() {
		this.locationIdUpdate(LocationGroup[0].id)
	}
  render() {
    return (
      <div className="weather-app">
      	<WeatherHeader selectedId={this.state.selectedLocationId} updateLocationId={this.locationIdUpdate}/>
        <WeatherPanel dailyInfo={this.state.daily} selectedId={this.state.selectedLocationId} /> 
      </div>      
    );
  }
}

export default WeatherApp;
