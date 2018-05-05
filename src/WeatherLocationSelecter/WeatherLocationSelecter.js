import React, { Component } from 'react';

class WeatherLocationSelecter extends Component {

  render() {
    const {LocationGroup, locationIdUpdate, selectedId} = this.props
    return (
      <div className="weather-selecter">
      	{
      		LocationGroup.map((locationObj) => {
      			return <button className={locationObj.id === selectedId ? 'selected' : ''} key={locationObj.id} onClick={() => locationIdUpdate(locationObj.id)}>{locationObj.name}</button>
      		})
      	}
      </div>
    );
  }
}

export default WeatherLocationSelecter;