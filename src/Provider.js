import {Component} from 'react'
import PropTypes from 'prop-types'

class Provider extends Component {
	getChildContext() {
		return {
			store: this.props.store
		}
	}

	render() {
		return this.props.children
	}
}

Provider.childContextTypes = {
	store: PropTypes.object
}

export default Provider