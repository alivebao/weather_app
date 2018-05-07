import React, { Component } from 'react'

class WeatherTitle extends Component {
  render() {
    const {title} = this.props
    return <div>{title}</div>
  }
}

export default WeatherTitle