import React, { Component } from 'react'
import {view as WeatherSelectedStatus} from '../WeatherSelectedStatus'
import {view as WeatherCalenderSelecter} from '../WeatherCalenderSelecter'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

function mapState(state) {
  return {
    dailyInfo: state.daily
  }
}
class WeatherPanel extends Component {
  render() {
  	const {dailyInfo} = this.props
    if(!dailyInfo) {
      return <div>Init...</div>
    }
    if(typeof dailyInfo === 'string' || dailyInfo instanceof String){
      return <div>{dailyInfo}</div>
    }
    return (
      <div className="weather-panel">
      	<WeatherSelectedStatus/>
      	<WeatherCalenderSelecter/>
      </div>
    );
  }
}

export default connect(mapState)(WeatherPanel);