var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	C = require("../constants"),
	_ = require("lodash"),
	actions = require("../actions/"),
	Quote = require("./components/quote");

var Quoteslist = React.createClass({
	newQuote: function(e){
		if (!this.props.quotes.submitting){
			e.preventDefault();
			this.props.submitNewQuote(this.refs.newquote.value);
			this.refs.newquote.value = '';
		}
	},
	render: function(){
		var p = this.props, rows = _.map(p.quotes.data,function(quote,qid){
			var quotestate = p.quotes.states[qid];
			return <Quote
				key={qid}
				quote={quote}
				qid={qid}
				state={quotestate}
				edit={p.startEdit.bind(this,qid)}
				cancel={p.cancelEdit.bind(this,qid)}
				submit={p.submitEdit.bind(this,qid)}
				delete={p.deleteQuote.bind(this,qid)}
				mayedit={p.auth.uid === quote.uid}
			/>;
		}).reverse();
		return (<div className="quoteslist">
			{p.auth.uid ? <form className="newquoteform" onSubmit={this.newQuote}>
				<input ref="newquote" placeholder="write something clever!"/>
				<button type="submit" disabled={p.quotes.submittingnew}>{p.quotes.submittingnew ? "Submitting..." : "Submit"}</button>
			</form> : <p>Log in to add a new quote of your own!</p>}
			{p.quotes.hasreceiveddata ? rows : "Loading quotes..."}
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(appState){
	return {
		quotes: appState.quotes,
		auth: appState.auth
	};
};

var mapDispatchToProps = function(dispatch){
	return {
		submitNewQuote: function(content){ dispatch(actions.submitNewQuote(content)); },
		startEdit: function(qid){ dispatch(actions.startQuoteEdit(qid)); },
		cancelEdit: function(qid){ dispatch(actions.cancelQuoteEdit(qid)); },
		submitEdit: function(qid,content){ dispatch(actions.submitQuoteEdit(qid,content)); },
		deleteQuote: function(qid){ dispatch(actions.deleteQuote(qid)); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Quoteslist);
