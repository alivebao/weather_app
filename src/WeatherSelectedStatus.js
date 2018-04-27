import React, { Component } from 'react'
import './WeatherSelectedStatus.css'

class WeatherSelectedStatus extends Component {

  render() {
    const data = {
      "text_day": "多云",               //白天天气现象文字
      "code_day": "4",                  //白天天气现象代码
      "high": "26",                     //当天最高温度
      "low": "17",                      //当天最低温度
      "precip": "0",                    //降水概率，范围0~100，单位百分比
      "wind_direction_degree": "255",   //风向角度，范围0~360
      "wind_speed": "9.66",             //风速，单位km/h（当unit=c时）、mph（当unit=f时）
    }
    const {text_day, code_day, high, low, precip, wind_direction_degree, wind_speed} = data
    return (
      <div className="selected-status">
        <div className="status">{text_day}</div>
        <div className="detail">
          <div>
            <img alt="status-img" src={require('./img/status_icon/' + code_day + '.png')} />
            <span>{low} ~ {high}°C</span>
          </div>
          <div>
            <div>降水概率: {precip}</div>
            <div>风向角度(0~360): {wind_direction_degree}</div>
            <div>风速(km): {wind_speed}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherSelectedStatus;