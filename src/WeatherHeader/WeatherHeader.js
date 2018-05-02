import React, { Component } from 'react'
import {view as WeatherLocationSelecter} from '../WeatherLocationSelecter'
import {arrLocation as LocationGroup} from '../utils'
import WeatherStore from '../WeatherStore'
import './WeatherHeader.css'

class WeatherHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedId: undefined
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState({
      selectedId: WeatherStore.getDailyInfo().locationId
    })
  }

  componentDidMount() {
    WeatherStore.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    WeatherStore.removeChangeListener(this.onChange)
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
        <WeatherLocationSelecter/>
      </div>
    );
  }
}

export default WeatherHeader;