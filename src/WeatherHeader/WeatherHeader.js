import React, { Component } from 'react'
import {view as WeatherLocationSelecter} from '../WeatherLocationSelecter'
import {view as WeatherTitle} from '../WeatherTitle'
import {arrLocation as LocationGroup} from '../utils'
import './WeatherHeader.css'

class WeatherHeader extends Component {
  render() {
    return (
      <div className="weather-header">
        <WeatherTitle LocationGroup={LocationGroup}/>
        <WeatherLocationSelecter LocationGroup={LocationGroup}/>
      </div>
    );
  }
}

export default WeatherHeader;