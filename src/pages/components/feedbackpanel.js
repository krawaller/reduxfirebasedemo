var React = require("react"),
	ReactRedux = require("react-redux"),
	actions = require("../../actions"),
	C = require("../../constants");

var Feedbackpanel = React.createClass({
	render: function(){
		var p = this.props, rows = p.feedback.map(function(f,n){
			return (<div key={n} className={"feedback"+(f.error?" error":"")}>
				{f.msg}
				<button onClick={p.dismissFeedback.bind(this,n)}>X</button>
			</div>);
		});
		return (<div className="feedbacklist">
			{rows}
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(appState){
	// This component will have access to `appState.feedback` through `this.props.feedback`
	return {feedback:appState.feedback};
};

var mapDispatchToProps = function(dispatch){
	return {
		dismissFeedback: function(n){ dispatch(actions.dismissFeedback(n)); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Feedbackpanel);
