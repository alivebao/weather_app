import React, { Component } from 'react'
import {view as WeatherSelectedStatus} from '../WeatherSelectedStatus'
import {view as WeatherCalenderSelecter} from '../WeatherCalenderSelecter'
import WeatherStore from '../WeatherStore'

class WeatherPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCalender: 0, 
      dailyInfo: undefined
    }

    this.updateSelectedCalender = this.updateSelectedCalender.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState({
      dailyInfo: WeatherStore.getDailyInfo().daily
    })
  }

  componentDidMount() {
    WeatherStore.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    WeatherStore.removeChangeListener(this.onChange)
  }

  updateSelectedCalender(selectedCalender) {
    this.setState({
      selectedCalender: selectedCalender
    })
  }

  render() {
  	const dailyInfo = this.state.dailyInfo
    if(!dailyInfo) {
      return <div>Init...</div>
    }
    if(typeof dailyInfo === 'string' || dailyInfo instanceof String){
      return <div>{dailyInfo}</div>
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