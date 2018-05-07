import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WeatherSelectedStatus from './WeatherSelectedStatus'

class WeatherSelectedStatusWrapper extends Component {
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
      currentDayInfo: this.context.store.getState().daily[this.context.store.getState().calenderId]
    }
  }

  componentDidMount() {
    this.context.store.subscribe(this.onChange)
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.onChange)
  }

  render() {
    const {daily, calenderId} = this.context.store.getState()
    return <WeatherSelectedStatus currentDayInfo={daily[calenderId]} />
  }
}

WeatherSelectedStatusWrapper.contextTypes = {
  store: PropTypes.object
}

export default WeatherSelectedStatusWrapper;