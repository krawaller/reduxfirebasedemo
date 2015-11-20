var C = require("../../constants"),
	initialState = require("../initialstate");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.feedback data, which is an array of messages.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function(currentfeedback,action){
	switch(action.type){
		case C.DISMISS_FEEDBACK:
			return currentfeedback.filter((i,n)=>n!==action.num);
		case C.DISPLAY_ERROR:
			return currentfeedback.concat({msg:action.error,error:true});
		case C.DISPLAY_MESSAGE:
			return currentfeedback.concat({msg:action.message,error:false});
		default: return currentfeedback || initialState.feedback;
	}
};