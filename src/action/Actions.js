import * as ActionTypes from './ActionTypes'
import AppDispatcher from '../AppDispatcher'

export const updateLocation = (locationId) => {
	AppDispatcher.dispatch({
		type: ActionTypes.UPDATELOCATION, 
		locationId: locationId
	})
}