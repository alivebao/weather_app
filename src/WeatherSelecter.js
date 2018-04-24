import React, { Component } from 'react';

class WeatherSelecter extends Component {
  componentWillMount() {
    console.log('component WeatherSelecter WillMount')
  }

  componentDidMount() {
    console.log('component WeatherSelecter DidMount')
  } 

  render() {
    console.log('component WeatherSelecter render')
  	const {locationGroup, locationUpdate} = this.props;
    return (
      <div className="weather-selecter">
      	<select onChange={(event) => {locationUpdate(event.target.value)}}>
      	{
      		locationGroup.map((locationObj) => {
      			return <option key={locationObj.id} value={locationObj.name}>{locationObj.name}</option>
      		})
      	}</select>
      </div>
    );
  }
}

export default WeatherSelecter;
