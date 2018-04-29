import React, { Component } from 'react'
import './WeatherSelectedStatus.css'

class WeatherSelectedStatus extends Component {

  render() {
    const {currentDayInfo} = this.props
    const {text_day, code_day, high, low, wind_scale, wind_direction, wind_direction_degree, wind_speed} = currentDayInfo
    return (
      <div className="selected-status">
        <div className="status">{text_day}</div>
        <div className="detail">
          <div>
            <img alt="status-img" src={require('./img/status_icon/' + code_day + '.png')} />
            <span>{low} ~ {high}°C</span>
          </div>
          <div>
            <div>风力等级: {wind_scale}</div>
            <div>风向角度(0~360): {wind_direction} { wind_direction_degree}</div>
            <div>风速(km): {wind_speed}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherSelectedStatus;