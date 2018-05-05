import React, { Component } from 'react'
import {view as WeatherSelectedStatus} from '../WeatherSelectedStatus'
import {view as WeatherCalenderSelecter} from '../WeatherCalenderSelecter'
import store from '../Store.js'

class WeatherPanel extends Component {
  constructor(props) {
    super(props)

    this.state = this.getOwnState()

    this.getOwnState = this.getOwnState.bind(this)
    this.updateSelectedCalender = this.updateSelectedCalender.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState(this.getOwnState())
  }

  getOwnState() {
    return {
      selectedCalender: 0, 
      dailyInfo: store.getState().daily
    }
  }

  componentDidMount() {
    store.subscribe(this.onChange)
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange)
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