var authActions = require("./auth"),
	quotesActions = require("./quotes"),
	feedbackActions = require("./feedback");

module.exports = Object.assign({},authActions,quotesActions,feedbackActions);