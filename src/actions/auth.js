/*
This module contains action creators dealing with `appState.auth`
They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var C = require("../constants"),
	Firebase = require("firebase"),
	fireRef = new Firebase(C.FIREBASE);

module.exports = {
	// called at app start
	startListeningToAuth: function(){
		return function(dispatch,getState){
			fireRef.onAuth(function(authData){
				if (authData){ 
					dispatch({
						type: C.LOGIN_USER,
						uid: authData.uid,
						username: authData.github.displayName
					});
				} else {
					if (getState().auth.currently !== C.ANONYMOUS){ // log out if not already logged out
						dispatch({type:C.LOGOUT});
					}
				}
			});
		}
	},
	// called when user clicks the "login" button
	attemptLogin: function(){
		return function(dispatch,getState){
			dispatch({type:C.ATTEMPTING_LOGIN});
			fireRef.authWithOAuthPopup("github", function(error, authData) {
				if (error) {
					dispatch({type:C.DISPLAY_ERROR,error:"Login failed!"});
					dispatch({type:C.LOGOUT});
				} else {
					// no need to do anything here, startListeningToAuth have already made sure that we update on changes
				}
			});
		}
	},
	logoutUser: function(){
		return function(dispatch,getState){
			dispatch({type:C.LOGOUT}); // don't really need to do this, but nice to get immediate feedback
			fireRef.unauth();
		}
	}
};
