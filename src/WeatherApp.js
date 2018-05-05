import React, { Component } from 'react'
import {view as WeatherHeader} from './WeatherHeader'
import {view as WeatherPanel} from './WeatherPanel'
import {arrLocation as LocationGroup} from './utils'
import {Actions} from './action'
import store from './Store.js'
import './WeatherApp.css'

class WeatherApp extends Component {	
	componentDidMount() {		
		store.dispatch(Actions.updateLocation(LocationGroup[0].id))
	}

  render() {
    return (
      <div className="weather-app">
      	<WeatherHeader />
        <WeatherPanel /> 
      </div>      
    )
  }
}

export default WeatherApp;
