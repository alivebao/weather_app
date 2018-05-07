import React, { Component } from 'react'
import {connect} from 'react-redux'

function getLocationName(locationGroup, selectedId) {
  let title = undefined
  locationGroup.forEach((val) => {
    if(val.id === selectedId) {
      title = val.name;
    }
  })
  return title
}

function mapState(state, ownProps) {
	return {
		title: getLocationName(ownProps.LocationGroup, state.locationId)
	}
}

class WeatherTitle extends Component {
  render() {
    const {title} = this.props
    return <div>{title}</div>
  }
}

export default connect(mapState)(WeatherTitle)