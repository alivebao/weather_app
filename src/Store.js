import {createStore} from 'redux'
import reducer from './Reducer.js'

const initValues = {
	daily: undefined, 
	locationId: 0
}

const store = createStore(reducer, initValues)

export default store