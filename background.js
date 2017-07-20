(function() {
	"use strict";

	const MSTDN_HOST = "https://friends.nico/";
	const POST_STATUS = MSTDN_HOST + "api/v1/statuses";
	const REBLOG_STATUS = MSTDN_HOST + "api/v1/statuses/*/reblog";

	function listen_toot(event) {
		console.log("onComplete detected");
		if (event.method == "POST") {
			console.log("exec update_name.js");
			chrome.tabs.executeScript({file: "update_name.js"});
		}
	}

	chrome.webRequest.onCompleted.addListener(
		listen_toot,
		{urls: [POST_STATUS, REBLOG_STATUS]}
	);
})();
