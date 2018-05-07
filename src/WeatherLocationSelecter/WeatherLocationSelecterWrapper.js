import React, { Component } from 'react';
import WeatherLocationSelecter from './WeatherLocationSelecter'
import {Actions} from '../action'
import PropTypes from 'prop-types'
import {arrLocation as LocationGroup} from '../utils'

class WeatherLocationSelecterWrapper extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = this.getOwnState()

    this.getOwnState = this.getOwnState.bind(this)
    this.onChange = this.onChange.bind(this)
    this.locationIdUpdate = this.locationIdUpdate.bind(this)
  }

  locationIdUpdate(locationId) {
    this.context.store.dispatch(Actions.updateLocation(locationId))
  }

  onChange() {
    this.setState(this.getOwnState())
  }

  getOwnState() {
    return {
      selectedId: this.context.store.getState().locationId
    }
  }

  componentDidMount() {
    this.context.store.subscribe(this.onChange)
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.onChange)
  }
  render() {
    return <WeatherLocationSelecter LocationGroup={LocationGroup} locationIdUpdate={this.locationIdUpdate} selectedId={this.context.store.getState().locationId}/>
  }
}

WeatherLocationSelecterWrapper.contextTypes = {
  store: PropTypes.object
}
export default WeatherLocationSelecterWrapper