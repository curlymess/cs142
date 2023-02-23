"use strict";

function cs142MakeMultiFilter( originalArray ){
	
	var currentArray = originalArray;
	
	// arrayFilterer returns itself UNLESS  filterCriteria is undef
	function arrayFilterer(filterCriteria, callback) {
		if(typeof(filterCriteria) !== 'function') {
			return currentArray;
		} else {
			currentArray = currentArray.filter(filterCriteria); // slide 16
		}
		
		// callback - if not a function then ignore
		if(typeof(callback) === 'function') {
			callback.call(originalArray, currentArray);
		}
		return arrayFilterer;
	}
	return arrayFilterer;

}