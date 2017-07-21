(function() {
	"use strict";
	const INIT_STATE = JSON.parse(document.getElementById("initial-state").textContent);
	const BEARER_TOKEN = INIT_STATE.meta["access_token"];
	const MY_NUM_ID = INIT_STATE.meta["me"];
	const INSTANCE_NUM = INIT_STATE.meta["admin"];

	let tootCount = INIT_STATE.accounts[MY_NUM_ID]["statuses_count"];
	let myDisplayName = INIT_STATE.accounts[MY_NUM_ID]["display_name"];

	const MSTDN_HOST = location.origin + "/";
	const UPDATE_CRED = MSTDN_HOST + "api/v1/accounts/update_credentials";

	// display_name without toot count.
	const BASE_NAME = myDisplayName.replace(/(?:\[[0-9]+\])+$/, "");
	let suffixCount = "[" + tootCount.toString() + "]";

	const COUNT_AREA = document.createElement("p");
	COUNT_AREA.style.display = "none";
	COUNT_AREA.className = "toot-count";
	COUNT_AREA.innerText = tootCount.toString();
	document.body.appendChild(COUNT_AREA);

 	function update_display_name(name) {
		console.log("update name");
		let xhr = new XMLHttpRequest();

		xhr.open("PATCH", UPDATE_CRED);
		xhr.setRequestHeader("Authorization", "Bearer " + BEARER_TOKEN);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.timeout = "3000";

		const patch = "display_name=" + encodeURIComponent(name).replace(/%20/, "+");

		xhr.send(patch);
	}

	myDisplayName = BASE_NAME + suffixCount;
	update_display_name(myDisplayName);
})();
