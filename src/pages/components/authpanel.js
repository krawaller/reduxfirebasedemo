var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	actions = require("../../actions"),
	C = require("../../constants"),
	Link = require("react-router").Link;

var Authpanel = React.createClass({
	propTypes: {
		// redux store state, imported below
		auth: ptypes.shape({ 
			currently: ptypes.oneOf([C.LOGGED_IN,C.ANONYMOUS,C.AWAITING_AUTH_RESPONSE]).isRequired,
			uid: ptypes.oneOfType([ptypes.string,ptypes.null]),
			username: ptypes.oneOfType([ptypes.string,ptypes.null])
		}).isRequired,
		// redux action hookups, set up below
		attemptLogin: ptypes.func.isRequired,
		logoutUser: ptypes.func.isRequired
	},
	render: function(){
		var p = this.props, auth = p.auth;
		switch(auth.currently){
			case C.LOGGED_IN: return (
				<div className="authpanel">
					<span>Logged in as {auth.username}.</span>
					{' '}<button onClick={p.logoutUser}>Log out</button>
				</div>
			);
			case C.AWAITING_AUTH_RESPONSE: return (
				<div className="authpanel">
					<button disabled><i className="fa fa-spinner fa-spin"></i> authenticating...</button>
				</div>
			);
			default: return (
				<div className="authpanel">
					<button onClick={p.attemptLogin}>Log in</button>
				</div>
			);
		}
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(appState){
	// This component will have access to `appState.auth` through `this.props.auth`
	return {auth:appState.auth};
};

var mapDispatchToProps = function(dispatch){
	return {
		attemptLogin: function(){ dispatch(actions.attemptLogin()); },
		logoutUser: function(){ dispatch(actions.logoutUser()); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Authpanel);
