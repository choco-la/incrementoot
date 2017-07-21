(function() {
	"use strict";

	const MSTDN_HOST = "https://friends.nico/";
	const POST_STATUS = MSTDN_HOST + "api/v1/statuses";
	const REBLOG_STATUS = MSTDN_HOST + "api/v1/statuses/*/reblog";

	const UPDATE_NAME_JS_PATH = "/update_name.js";

	function listen_toot(event) {
		console.log("onComplete detected");
		if (event.method == "POST") {
			console.log("exec " + UPDATE_NAME_JS_PATH);
			chrome.tabs.executeScript({file: UPDATE_NAME_JS_PATH});
		}
	}

	chrome.webRequest.onCompleted.addListener(
		listen_toot,
		{urls: [POST_STATUS, REBLOG_STATUS]}
	);
})();
