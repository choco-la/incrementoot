(function() {
	"use strict";
	const INIT_STATE = JSON.parse(document.getElementById("initial-state").textContent);
	const BEARER_TOKEN = INIT_STATE.meta["access_token"];
	const MY_NUM_ID = INIT_STATE.meta["me"];
	const INSTANCE_NUM = INIT_STATE.meta["admin"];


	let myDisplayName = INIT_STATE.accounts[MY_NUM_ID]["display_name"];

	const MSTDN_HOST = location.origin + "/";
	const UPDATE_CRED = MSTDN_HOST + "api/v1/accounts/update_credentials";

	const COUNT_AREA = document.getElementsByClassName("toot-count")[0];
	const tootCount = String(Number(COUNT_AREA.innerText) + 1);
	COUNT_AREA.innerText = tootCount;

	// display_name without toot count.
	const BASE_NAME = myDisplayName.replace(/(?:\[[0-9]+\])+$/, "");
	let suffixCount = "[" + tootCount.toString() + "]";


	function update_display_name(name) {
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
