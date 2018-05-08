import {ActionTypes} from './action'

export default (state, action) => {
	switch(action.type) {
	  case ActionTypes.UPDATECALENDER: 
	  	return {...state, calenderId: action.calenderId}
	  case ActionTypes.FETCHDATASTARTED: 
	  	return {...state, daily: action.daily, locationId: action.locationId}
	  case ActionTypes.FETCHDATASUCCESS: 
	  	return {...state, daily: action.daily, locationId: action.locationId}
	  case ActionTypes.FETCHDATAFAILED: 
	  	return {...state, daily: action.daily, locationId: action.locationId}
		default:
			return state
	}
}