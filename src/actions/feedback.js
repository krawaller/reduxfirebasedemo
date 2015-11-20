/*
This module contains action creators dealing with `appState.feedback`
The only thing that can happen here is that user dismisses feedback.
*/

var C = require("../constants");

module.exports = {
	dismissFeedback: function(num){
		return {type:C.DISMISS_FEEDBACK,num:num};
	}
};
