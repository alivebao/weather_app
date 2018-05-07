import React, { Component } from 'react'
import WeatherTitle from './WeatherTitle'
import PropTypes from 'prop-types'
import {arrLocation as LocationGroup} from '../utils'

class WeatherTitleWrapper extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = this.getOwnState()

    this.getOwnState = this.getOwnState.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getLocationName = this.getLocationName.bind(this)
  }

  getLocationName(locationGroup, selectedId) {
    let title = undefined
    locationGroup.forEach((val) => {
      if(val.id === selectedId) {
        title = val.name;
      }
    })
    return title
  }

  onChange() {
    this.setState(this.getOwnState())
  }

  getOwnState() {
    return {
      title: this.getLocationName(LocationGroup, this.context.store.getState().locationId)
    }
  }

  componentDidMount() {
    this.context.store.subscribe(this.onChange)
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.onChange)
  }

  render() {
    return <WeatherTitle title={this.getLocationName(LocationGroup, this.context.store.getState().locationId)}/>
  }
}

WeatherTitleWrapper.contextTypes = {
  store: PropTypes.object
}

export default WeatherTitleWrapper