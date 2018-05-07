import React, { Component } from 'react'
import {Actions} from '../action'
import PropTypes from 'prop-types'
import WeatherCalenderSelecter from './WeatherCalenderSelecter'
import './WeatherCalenderSelecter.css'

class WeatherCalenderSelecterWrapper extends Component {
  constructor(props, context) {
    super(props, context)

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
      dailyInfo: this.context.store.getState().daily
    }
  }

  updateSelectedCalender(calenderId) {
    this.context.store.dispatch(Actions.updateCalender(calenderId))
  }

  componentDidMount() {
    this.context.store.subscribe(this.onChange)
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.onChange)
  }
  render() {
    const {dailyInfo, updateSelectedCalender} = this.props
    return <WeatherCalenderSelecter dailyInfo={this.context.store.getState().daily} updateSelectedCalender={this.updateSelectedCalender}/>
  }
}

WeatherCalenderSelecterWrapper.contextTypes = {
  store: PropTypes.object
}

export default WeatherCalenderSelecterWrapper;