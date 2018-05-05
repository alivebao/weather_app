import {ActionTypes} from './action'
import {arrLocation as LocationGroup, CustomConfig} from './utils'

export default (state, action) => {
	switch(action.type) {
		case ActionTypes.UPDATELOCATION:
			if(state.locationId === action.locationId) {
				return state
			}

			let requestCode = undefined
	    LocationGroup.forEach((val) => {
	      if(val.id === action.locationId) {
	        requestCode = val.code
	      }
	    })

	    if(!requestCode) {
	    	return {...state, daily: "Getting data Failed!", locationId: action.locationId}
	    }
	    const randomTem = Math.floor(Math.random() * 10)
	    let responseJSON = {"results":[{"location":{"id":"WX4FBXXFKE4F","name":"北京","country":"CN","path":"北京,北京,中国","timezone":"Asia/Shanghai","timezone_offset":"+08:00"},"daily":[{"date":"2018-05-05","text_day":"阴","code_day":"9","text_night":"多云","code_night":"4","high":"2" + randomTem,"low":"13","precip":"","wind_direction":"东北","wind_direction_degree":"45","wind_speed":"15","wind_scale":"3"},{"date":"2018-05-06","text_day":"晴","code_day":"0","text_night":"晴","code_night":"1","high":"28","low":"13","precip":"","wind_direction":"西南","wind_direction_degree":"225","wind_speed":"10","wind_scale":"2"},{"date":"2018-05-07","text_day":"晴","code_day":"0","text_night":"晴","code_night":"1","high":"29","low":"13","precip":"","wind_direction":"东南","wind_direction_degree":"135","wind_speed":"15","wind_scale":"3"}],"last_update":"2018-05-05T11:00:00+08:00"}]}
	    return {...state, daily: responseJSON.results[0].daily, locationId: action.locationId}
	    /*
	    const requestURL = `/v3/weather/daily.json?key=${CustomConfig.key}&location=${requestCode}&language=zh-Hans&unit=c&start=0&days=3`
	    fetch(requestURL)
	      .then((response) => {
	        if(response.status !== 200) {
	        	return {...state, daily: "Getting data Failed!", locationId: action.locationId}
	        }
	        response.json().then((responseJSON) => {
	        	return {...state, daily: responseJSON.results[0].daily, locationId: action.locationId}
	        })
	      }).catch((error) => {
	      	return {...state, daily: "Getting data Failed!", locationId: action.locationId}
	      })
	      */
		default:
			return state
	}
}