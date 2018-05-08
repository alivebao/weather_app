import * as ActionTypes from './ActionTypes'
import {arrLocation as LocationGroup, CustomConfig} from '../utils'

export const updateCalender = (calenderId) => {	
	return {
		type: ActionTypes.UPDATECALENDER, 
		calenderId: calenderId
	}
}

export const fetchDataSuccess = (daily, locationId) => {
	return {
		type: ActionTypes.FETCHDATASUCCESS, 
		locationId: locationId, 
		daily: daily
	}
}

export const fetchDataStarted = (locationId) => {
	return {
		type: ActionTypes.FETCHDATASTARTED, 
		daily: 'Loading...', 
		locationId: locationId
	}
}

export const fetchDataFailed = (locationId) => {
	return {
		type: ActionTypes.FETCHDATAFAILED, 
		daily: 'get data failed!', 
		locationId: locationId
	}
}

export const fetchData = (locationId) => {
	return (dispatch, getState) => {
		if(getState().locationId === locationId) {
			return 
		}
		let requestCode = undefined
    LocationGroup.forEach((val) => {
      if(val.id === locationId) {
        requestCode = val.code
      }
    })

    if(!requestCode) {
    	dispatch(fetchDataFailed(locationId))
    	return
    }

    dispatch(fetchDataStarted(locationId))

	 	const requestURL = `/v3/weather/daily.json?key=${CustomConfig.key}&location=${requestCode}&language=zh-Hans&unit=c&start=0&days=3`
    fetch(requestURL)
      .then((response) => {
      	if(response.status !== 200) {
	      	dispatch(fetchDataFailed(locationId))
    			return
	      }
        response.json().then((responseJSON) => {
        	dispatch(fetchDataSuccess(responseJSON.results[0].daily, locationId))
        }).catch((error) => {
        	dispatch(fetchDataFailed(locationId))
        })
      })
	}
}