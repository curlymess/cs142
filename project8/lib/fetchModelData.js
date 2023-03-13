var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/


function fetchModel(url) {
	return new Promise(function (resolve, reject) {
		var req = new XMLHttpRequest();
		req.open('GET', url);
		req.send();
		req.onreadystatechange = function () {
			if (this.readyState !== 4) {
				return;
			}
			if (this.status !== 200) {
				reject(new Error({ status: req.status, statusText: req.statusText }));
			} else {
				resolve({ data: JSON.parse(this.responseText) });
			}
		};
	});
}

export default fetchModel;
