let customThunkMiddleware = ({dispatch, getState}) => {
	return function(next) {
		return function(action) {
			if(typeof action === 'function') {
				return action(dispatch, getState)
			}			
			return next(action)
		}
	}
}

let customLogMiddleware = ({dispatch, getState}) => {
	return (next) => {
		return (action) => {
			console.log("action type is: " + action.type)
			next(action)
		}
	}
}

export {customThunkMiddleware, customLogMiddleware}