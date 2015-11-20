module.exports = {
	validateQuote: function(content){
		if (!content || content.length < 10){
			return "A quote needs at least 10 characters to be worthy of sharing with the world!";
		}
	} 
};