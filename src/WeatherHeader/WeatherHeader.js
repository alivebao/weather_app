import React, { Component } from 'react'
import {view as WeatherLocationSelecter} from '../WeatherLocationSelecter'
import {arrLocation as LocationGroup} from '../utils'
import './WeatherHeader.css'

class WeatherHeader extends Component {

  render() {
  	const {selectedId, udpateWeatherInfo} = this.props;
    let title = 'NA'
    LocationGroup.forEach((val) => {
      if(val.id === selectedId) {
        title = val.name;
      }
    })
    return (
      <div className="weather-header">
        <div className="weather-title">{title}</div>      
        <WeatherLocationSelecter selectedId={selectedId} udpateWeatherInfo={udpateWeatherInfo}/>
      </div>
    );
  }
}

export default WeatherHeader;