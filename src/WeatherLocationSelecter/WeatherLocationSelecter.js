import React, { Component } from 'react';
import {arrLocation as LocationGroup} from '../utils'
import {CustomConfig} from '../utils'

class WeatherLocationSelecter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentSelectedId: undefined
    }

    this.locationIdUpdate = this.locationIdUpdate.bind(this)
  }

  locationIdUpdate(locationId) {
    if(this.state.currentSelectedId === locationId) {
      return
    }
    this.props.udpateWeatherInfo('', '')
    let requestCode = 'NA'
    LocationGroup.forEach((val) => {
      if(val.id === locationId) {
        requestCode = val.code
      }
    })
    const requestURL = `/v3/weather/daily.json?key=${CustomConfig.key}&location=${requestCode}&language=zh-Hans&unit=c&start=0&days=3`
    fetch(requestURL)
      .then((response) => {
        if(response.status !== 200) {
          throw new Error('Fail to get response with status ' + response.status)
        }

        response.json().then((responseJSON) => {
          this.setState({
            currentSelectedId: locationId
          })
          this.props.udpateWeatherInfo(locationId, responseJSON.results[0].daily)
        })
      })
  }

  componentDidMount() {
    this.locationIdUpdate(LocationGroup[0].id)
  }

  render() {
  	const {selectedId} = this.props;
    return (
      <div className="weather-selecter">
      	{
      		LocationGroup.map((locationObj) => {
      			return <button className={locationObj.id === selectedId ? 'selected' : ''} key={locationObj.id} onClick={() => {this.locationIdUpdate(locationObj.id)}}>{locationObj.name}</button>
      		})
      	}
      </div>
    );
  }
}

export default WeatherLocationSelecter;
