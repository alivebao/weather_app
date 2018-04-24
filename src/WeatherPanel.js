import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WeatherPanel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			temperature: 'undefined'
		}

		this.getTemperature = this.getTemperature.bind(this);
	}

	componentWillMount() {
		console.log('component WeatherPanel WillMount')
	}

	componentDidMount() {
		console.log('component WeatherPanel DidMount')
	}

	componentWillReceiveProps(nextProps) {
		return true;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (nextProps.location !== this.props.location) || 
			(nextState.temperature !== this.state.temperature);
	}

	getTemperature() {
		const mockTemperature = Math.random() * 100;
		this.setState({
			temperature: mockTemperature
		})
	}

  render() {
  	console.log('component WeatherPanel render')
  	const {location} = this.props;
    return (
      <div className="weather-panel">
      	<div>{location}的温度是: {this.state.temperature}</div>
      	<button onClick = {this.getTemperature}>获取温度</button>
      </div>
    );
  }
}

WeatherPanel.propTypes = {
	location: PropTypes.string.isRequired
}

export default WeatherPanel;