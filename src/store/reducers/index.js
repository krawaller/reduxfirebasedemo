var Redux = require("redux"),
	authReducer = require("./auth"),
	quotesReducer = require("./quotes"),
	feedbackReducer = require("./feedback");

var rootReducer = Redux.combineReducers({
	auth: authReducer,
	quotes: quotesReducer,
	feedback: feedbackReducer
});

module.exports = rootReducer;