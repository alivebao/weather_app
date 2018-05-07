import React, { Component } from 'react'
import {view as WeatherSelectedStatus} from '../WeatherSelectedStatus'
import {view as WeatherCalenderSelecter} from '../WeatherCalenderSelecter'
import PropTypes from 'prop-types'

class WeatherPanel extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = this.getOwnState()

    this.getOwnState = this.getOwnState.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState(this.getOwnState())
  }

  getOwnState() {
    return {
      dailyInfo: this.context.store.getState().daily
    }
  }

  componentDidMount() {
    this.context.store.subscribe(this.onChange)
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.onChange)
  }

  render() {
  	const dailyInfo = this.context.store.getState().daily
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

WeatherPanel.contextTypes = {
  store: PropTypes.object
}

export default WeatherPanel;