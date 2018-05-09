import {createStore, compose, applyMiddleware} from 'redux'
import reducer from './Reducer.js'
import {customThunkMiddleware, customLogMiddleware} from './customMiddleware'

const initValues = {
	daily: undefined, 
	locationId: 0, 
	calenderId: 0
}

const middlewares = [customThunkMiddleware, customLogMiddleware]

const storeEnhancers = compose(applyMiddleware(...middlewares))

export default createStore(reducer, initValues, storeEnhancers)