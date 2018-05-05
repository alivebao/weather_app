import * as ActionTypes from './ActionTypes'

export const updateLocation = (locationId) => {	
	return {
		type: ActionTypes.UPDATELOCATION, 
		locationId: locationId
	}
}