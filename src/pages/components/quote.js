var React = require("react"),
	ptypes = React.PropTypes,
	C = require("../../constants");

var Quote = React.createClass({
	submit: function(e){
		var p = this.props,
			field = this.refs.field;
		p.submit(field.value);
		field.value = "";
		e.preventDefault();
	},
	render: function(){
		var p = this.props,
			q = p.quote,
			button;
		if (p.state === C.EDITING_QUOTE){
			return (<form className="quote" onSubmit={this.submit}>
				<input ref="field" defaultValue={q.content}/>
				<button type="button" onClick={p.cancel}>Cancel</button>
				<button type="submit" onClick={this.submit}>Submit</button>
			</form>);
		}
		if (!p.mayedit){
			button = ""
		} else if (p.state === C.SUBMITTING_QUOTE) {
			button = <button disabled="disabled">Submitting...</button>;
		} else {
			button = <span><button onClick={p.edit}>Edit</button><button onClick={p.delete}>Delete</button></span>;
		}
		return <div className="quote"><span className="author">{q.username+" said: "}</span>{q.content} {button}</div>;
	}
});

module.exports = Quote
