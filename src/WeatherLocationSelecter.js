import React, { Component } from 'react';
import {arrLocation as LocationGroup} from './WeatherLocationGroup'

class WeatherLocationSelecter extends Component {

  render() {
  	const {locationUpdate} = this.props;
    return (
      <div className="weather-selecter">
      	{
      		LocationGroup.map((locationObj) => {
      			return <button key={locationObj.id} onClick={() => locationUpdate(locationObj.id)}>{locationObj.name}</button>
      		})
      	}
      </div>
    );
  }
}

export default WeatherLocationSelecter;
