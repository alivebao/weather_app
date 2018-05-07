import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Actions} from '../action'
import './WeatherCalenderSelecter.css'

function mapState(state) {
  return {
    dailyInfo: state.daily
  }
}

function mapDispatch(dispatch) {
  return {
    updateSelectedCalender: (calenderId) => {
      dispatch(Actions.updateCalender(calenderId))
    }
  }
}

class WeatherCalenderSelecter extends Component {

  render() {
    const {dailyInfo, updateSelectedCalender} = this.props
    return (
      <div className="weather-calender-selecter">
        {
        	dailyInfo.map((dataObj, index) => {
        		return (
        			<div key={dataObj.date} className="weather-data" onClick={() => {updateSelectedCalender(index)}}>
        				<div className="date">{dataObj.date}</div>
        				<div className="status">
        					<img alt="status-img" src={require('../img/status_icon/' + dataObj.code_day + '.png')} />
        				</div>
        				<div className="range">{dataObj.low} ~ {dataObj.high}°C</div>
        			</div>
        		)
        	})
        }
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(WeatherCalenderSelecter);