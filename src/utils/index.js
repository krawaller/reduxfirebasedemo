module.exports = {
	validateQuote: function(content){
		content = content || "";
		if (content.length<10){
			return "Ett citat måste ha MINST 10 tecken för att vara värt att dela med omvärlden!";
		}
	} 
};