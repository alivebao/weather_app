import React, { Component } from 'react'
import WeatherLocationSelecter from './WeatherLocationSelecter'
import {arrLocation as LocationGroup} from './WeatherLocationGroup'
import './WeatherHeader.css'

class WeatherHeader extends Component {

  render() {
  	const {selectedId, updateLocationId} = this.props;
    let title = 'NA'
    LocationGroup.forEach((val) => {
      if(val.id === selectedId) {
        title = val.name;
      }
    })
    return (
      <div className="weather-header">
        <div className="weather-title">{title}</div>      
        <WeatherLocationSelecter selectedId={selectedId} locationUpdate={updateLocationId}/>
      </div>
    );
  }
}

export default WeatherHeader;