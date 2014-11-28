var page = require("webpage").create();
var system = require("system");

if (system.args.length < 2) {
	console.log("Page load timer");
	console.log("Usage: phantomjs loadtimer.js URL [username:password]");
	console.log("  URL - URL of the page to test");
	console.log("  username - User name for HTTP authentication");
	console.log("  password - Password for HTTP authentication");
	console.log("User name and password are optional.");
	
	phantom.exit();
}

var url = system.args[1];
var credentials = system.args[2];

if (credentials) {
	credentials = credentials.split(":");
	page.settings.userName = credentials[0];
	page.settings.password = credentials[1];
}

var requestCount = 0;

page.onResourceRequested = function() {
	requestCount++;
}

page.onResourceReceived = function (res) {
	console.log(" * " + res.url + ": " + res.status + " " + res.statusText);
};

console.log("Loading " + url);

var t = Date.now();
page.open(url, function (status) {

	if (status !== "success") {
		console.log("Could not open the requested page (status: " + status + ").");
		setTimeout(function() { phantom.exit(); }, 0);
	}

	var reqTime = Date.now() - t;
	console.log("Request count: " + requestCount);
	console.log("Loading time: " + reqTime + " ms");
	
	page.render("screenshot.png");

	setTimeout(function() { phantom.exit(); }, 0);
});
