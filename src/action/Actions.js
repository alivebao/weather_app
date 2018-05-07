import * as ActionTypes from './ActionTypes'

export const updateLocation = (locationId) => {	
	return {
		type: ActionTypes.UPDATELOCATION, 
		locationId: locationId
	}
}

export const updateCalender = (calenderId) => {	
	return {
		type: ActionTypes.UPDATECALENDER, 
		calenderId: calenderId
	}
}