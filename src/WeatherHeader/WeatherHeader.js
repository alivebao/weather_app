import React, { Component } from 'react'
import {view as WeatherLocationSelecter} from '../WeatherLocationSelecter'
import {arrLocation as LocationGroup} from '../utils'
import {Actions} from '../action'
import store from '../Store.js'
import './WeatherHeader.css'

class WeatherHeader extends Component {
  constructor(props) {
    super(props)

    this.state = this.getOwnState()

    this.getOwnState = this.getOwnState.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  getOwnState() {
    return {
      selectedId: store.getState().locationId
    }
  }

  locationIdUpdate(locationId) {    
    store.dispatch(Actions.updateLocation(locationId))
  }

  onChange() {
    this.setState(this.getOwnState())
  }

  componentDidMount() {
    store.subscribe(this.onChange)    
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange)
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
        <WeatherLocationSelecter LocationGroup={LocationGroup} selectedId={this.state.locationIdUpdate} locationIdUpdate={this.locationIdUpdate}/>
      </div>
    );
  }
}

export default WeatherHeader;