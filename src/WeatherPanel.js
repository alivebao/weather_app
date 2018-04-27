import React, { Component } from 'react'
import WeatherSelectedStatus from './WeatherSelectedStatus'
import WeatherCalenderSelecter from './WeatherCalenderSelecter'

class WeatherPanel extends Component {

  render() {
    return (
      <div className="weather-panel">
      	<WeatherSelectedStatus />
      	<WeatherCalenderSelecter />
      </div>
    );
  }
}
export default WeatherPanel;