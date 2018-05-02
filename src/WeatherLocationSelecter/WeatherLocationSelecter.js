import React, { Component } from 'react';
import {arrLocation as LocationGroup} from '../utils'
import WeatherStore from '../WeatherStore'
import {Actions} from '../action'

class WeatherLocationSelecter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentSelectedId: undefined
    }

    this.locationIdUpdate = this.locationIdUpdate.bind(this)
    this.onChange = this.onChange.bind(this)
  }


  locationIdUpdate(locationId) {
    Actions.updateLocation(locationId)
  }

  onChange() {
    this.setState({
      currentSelectedId: WeatherStore.getDailyInfo().locationId
    })
  }

  componentDidMount() {
    WeatherStore.addChangeListener(this.onChange)
    this.locationIdUpdate(LocationGroup[0].id)
  }

  componentWillUnmount() {
    WeatherStore.removeChangeListener(this.onChange)
  }

  render() {
    return (
      <div className="weather-selecter">
      	{
      		LocationGroup.map((locationObj) => {
      			return <button className={locationObj.id === this.state.currentSelectedId ? 'selected' : ''} key={locationObj.id} onClick={() => {this.locationIdUpdate(locationObj.id)}}>{locationObj.name}</button>
      		})
      	}
      </div>
    );
  }
}

export default WeatherLocationSelecter;
