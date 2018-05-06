import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {view as WeatherLocationSelecter} from '../WeatherLocationSelecter'
import {arrLocation as LocationGroup} from '../utils'
import {Actions} from '../action'
import './WeatherHeader.css'

class WeatherHeader extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = this.getOwnState()

    this.getOwnState = this.getOwnState.bind(this)
    this.onChange = this.onChange.bind(this)
    this.locationIdUpdate = this.locationIdUpdate.bind(this)
  }

  getOwnState() {
    return {
      selectedId: this.context.store.getState().locationId
    }
  }

  locationIdUpdate(locationId) {    
    this.context.store.dispatch(Actions.updateLocation(locationId))
  }

  onChange() {
    this.setState(this.getOwnState())
  }

  componentDidMount() {
    this.context.store.subscribe(this.onChange)    
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.onChange)
  }
  render() {
    const selectedId = this.state.selectedId;
    let title = undefined
    LocationGroup.forEach((val) => {
      if(val.id === selectedId) {
        title = val.name;
      }
    })
    return (
      <div className="weather-header">
        <div className="weather-title">{title}</div>      
        <WeatherLocationSelecter LocationGroup={LocationGroup} selectedId={selectedId} locationIdUpdate={this.locationIdUpdate}/>
      </div>
    );
  }
}

WeatherHeader.contextTypes = {
  store: PropTypes.object
}

export default WeatherHeader;