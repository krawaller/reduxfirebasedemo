/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

var React = require('react'),
	ReactDOM = require('react-dom'),
	Router = require('react-router').Router,
	Provider = require('react-redux').Provider,
	store = require('./store'),
	routes = require('./routes'),
	actions = require('./actions')

ReactDOM.render(
	// The top-level Provider is what allows us to `connect` components to the store
	// using ReactRedux.connect (see components Home and Hero)
	<Provider store={store}>
		<Router routes={routes}/>
	</Provider>,
	document.getElementById("root")
);

// setup Firebase listeners
setTimeout(function(){
	store.dispatch( actions.startListeningToAuth() );
	store.dispatch( actions.startListeningToQuotes() );
});