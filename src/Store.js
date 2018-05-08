import {createStore, compose, applyMiddleware} from 'redux'
import reducer from './Reducer.js'
import thunkMiddelware from 'redux-thunk'

const initValues = {
	daily: undefined, 
	locationId: 0, 
	calenderId: 0
}

const middlewares = [thunkMiddelware]

const storeEnhancers = compose(applyMiddleware(...middlewares))

export default createStore(reducer, initValues, storeEnhancers)