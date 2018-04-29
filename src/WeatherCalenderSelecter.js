import React, { Component } from 'react'
import './WeatherCalenderSelecter.css'

class WeatherCalenderSelecter extends Component {

  render() {
  	const daily = [{"date":"2018-04-29","text_day":"多云","code_day":"4","text_night":"小雨","code_night":"13","high":"28","low":"16","precip":"","wind_direction":"南","wind_direction_degree":"180","wind_speed":"15","wind_scale":"3"},{"date":"2018-04-30","text_day":"多云","code_day":"4","text_night":"多云","code_night":"4","high":"25","low":"14","precip":"","wind_direction":"南","wind_direction_degree":"180","wind_speed":"15","wind_scale":"3"},{"date":"2018-05-01","text_day":"小雨","code_day":"13","text_night":"小雨","code_night":"13","high":"25","low":"13","precip":"","wind_direction":"北","wind_direction_degree":"0","wind_speed":"20","wind_scale":"4"}]
    return (
      <div className="weather-calender-selecter">
        {
        	daily.map((dataObj) => {
        		return (
        			<div className="weather-data">
        				<div className="date">{dataObj.date}</div>
        				<div className="status">
        					<img alt="status-img" src={require('./img/status_icon/' + dataObj.code_day + '.png')} />
        				</div>
        				<div className="range">{dataObj.high} ~ {dataObj.low}°C</div>
        			</div>
        		)
        	})
        }
      </div>
    );
  }
}

export default WeatherCalenderSelecter;