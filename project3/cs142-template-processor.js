"use strict";
 // template processor class constructor
function Cs142TemplateProcessor(template) {
	this.template = template;
}

// template processor method - prototypes and inheritance
	
Cs142TemplateProcessor.prototype.fillIn = function( dictionary ) {
	// regular expressions to searsch for {{property}}
	var templateStr = this.template;
	var regCriteria = /{{[^{]*}}/g; // [^{] = any character except {,  quantifier * = match 0 or more occurrences, modifier g = look for ALL matches
	var regResults = templateStr.match(regCriteria);
	
	/* for (var r = 0; r < regResults.length; r++){
		var word = regResults[r].replace("{{", "").replace("}}","");
		templateStr=templateStr.replace(regResults[r], dictionary[word]|| "");
	} */
	
 	// replace results found
	for ( var r = 0; r < regResults.length; r++ ){
		// remove {{ and }} from {{property}}
		var cleanedWord = regResults[r].replace("{{", "").replace("}}","");
		
		// check if property is in dictionary
		if(dictionary[cleanedWord]){
			templateStr = templateStr.replace(regResults[r], dictionary[cleanedWord]); 
		} else {
			templateStr = templateStr.replace(regResults[r], ''); 
		}
	}
	return templateStr; 
	
};