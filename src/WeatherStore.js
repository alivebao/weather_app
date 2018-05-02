import {ActionTypes} from './action'
import AppDispatcher from './AppDispatcher'
import {EventEmitter} from 'events'
import {arrLocation as LocationGroup, CustomConfig} from './utils'

const CHANGE_EVENT = 'updateLocation'

let locationId = undefined
let daliyInfo = {}

const WeatherStore = Object.assign({}, EventEmitter.prototype, {
	getDailyInfo: function() {
		return daliyInfo
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT)
	},

	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb)
	},

	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb)
	}
})

AppDispatcher.register((action) => {
	if(action.type === ActionTypes.UPDATELOCATION) {
		if(daliyInfo.locationId === action.locationId) {
			return
		}
		daliyInfo.locationId = action.locationId
		daliyInfo.daily = "Getting data ..."
		WeatherStore.emitChange()

		let requestCode = undefined
    LocationGroup.forEach((val) => {
      if(val.id === daliyInfo.locationId) {
        requestCode = val.code
      }
    })

    const requestURL = `/v3/weather/daily.json?key=${CustomConfig.key}&location=${requestCode}&language=zh-Hans&unit=c&start=0&days=3`
    fetch(requestURL)
      .then((response) => {
        if(response.status !== 200) {
        	daliyInfo.daily = "Getting data Failed!"
          throw new Error('Fail to get response with status ' + response.status)
        }
        response.json().then((responseJSON) => {
        	daliyInfo.daily = responseJSON.results[0].daily
        	WeatherStore.emitChange()
        })
      }).catch((error) => {
      	daliyInfo.daily = "Getting data Failed!"
      	WeatherStore.emitChange()
      })
	}
})

export default WeatherStore