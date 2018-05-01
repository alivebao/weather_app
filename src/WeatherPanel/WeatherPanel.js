import React, { Component } from 'react'
import {view as WeatherSelectedStatus} from '../WeatherSelectedStatus'
import {view as WeatherCalenderSelecter} from '../WeatherCalenderSelecter'

class WeatherPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCalender: 0
    }

    this.updateSelectedCalender = this.updateSelectedCalender.bind(this)
  }

  updateSelectedCalender(selectedCalender) {
    this.setState({
      selectedCalender: selectedCalender
    })
  }

  render() {
  	const {dailyInfo} = this.props
  	if(!Array.isArray(dailyInfo)) {
  		return <div>Loading...</div>
  	}
    return (
      <div className="weather-panel">
      	<WeatherSelectedStatus currentDayInfo={dailyInfo[this.state.selectedCalender]}/>
      	<WeatherCalenderSelecter dailyInfo={dailyInfo} updateSelectedCalender={this.updateSelectedCalender}/>
      </div>
    );
  }
}
export default WeatherPanel;