/*
This module contains action creators dealing with `appState.quotes`
*/

var C = require("../constants"),
	Firebase = require("firebase"),
	quotesRef = new Firebase(C.FIREBASE).child("quotes"),
	utils = require("../utils");

module.exports = {
	// called when the app starts. this means we immediately download all quotes, and 
	// then receive all quotes again as soon as anyone changes anything.
	startListeningToQuotes: function(){
		return function(dispatch,getState){
			quotesRef.on("value",function(snapshot){
				dispatch({ type: C.RECEIVE_QUOTES_DATA, data: snapshot.val() });
			});
		}
	},
	startQuoteEdit: function(qid){
		return {type:C.START_QUOTE_EDIT,qid};
	},
	cancelQuoteEdit: function(qid){
		return {type:C.FINISH_QUOTE_EDIT,qid};
	},
	deleteQuote: function(qid){
		return function(dispatch,getState){
			dispatch({type:C.SUBMIT_QUOTE_EDIT,qid});
			quotesRef.child(qid).remove(function(error){
				dispatch({type:C.FINISH_QUOTE_EDIT,qid});
				if (error){
					dispatch({type:C.DISPLAY_ERROR,error:"Deletion failed! "+error});
				} else {
					dispatch({type:C.DISPLAY_MESSAGE,message:"Quote successfully deleted!"});
				}
			});
		};
	},
	submitQuoteEdit: function(qid,content){
		return function(dispatch,getState){
			var state = getState(),
				username = state.auth.username,
				uid = state.auth.uid,
				error = utils.validateQuote(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
			} else {
				dispatch({type:C.SUBMIT_QUOTE_EDIT,qid});
				quotesRef.child(qid).set({content,username,uid},function(error){
					dispatch({type:C.FINISH_QUOTE_EDIT,qid});
					if (error){
						dispatch({type:C.DISPLAY_ERROR,error:"Update failed! "+error});
					} else {
						dispatch({type:C.DISPLAY_MESSAGE,message:"Update successfully saved!"});
					}
				});
			}
		};
	},
	submitNewQuote: function(content){
		return function(dispatch,getState){
			var state = getState(),
				username = state.auth.username,
				uid = state.auth.uid,
				error = utils.validateQuote(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
			} else {
				dispatch({type:C.AWAIT_NEW_QUOTE_RESPONSE});
				quotesRef.push({content,username,uid},function(error){
					dispatch({type:C.RECEIVE_NEW_QUOTE_RESPONSE});
					if (error){
						dispatch({type:C.DISPLAY_ERROR,error:"Submission failed! "+error});
					} else {
						dispatch({type:C.DISPLAY_MESSAGE,message:"Submission successfully saved!"});
					}
				});
			}
		}
	}
};
