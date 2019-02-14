/**
 * Module dependencies.
 */

var app = require("../app");
var api = require("../api");
var debug = require("debug")("project:server");
var http = require("http");
require("dotenv").config();
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "5000");
app.set("port", port);
api.set("port", Number(port) + 1);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var proxy = http.createServer(api);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
proxy.listen(Number(port) + 1);

server.on("error", onError);
server.on("listening", () => onListening(server, "app"));

proxy.on("error", onError);
proxy.on("listening", () => onListening(proxy, "proxy"));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	console.log("ON ERROR CODE", error.code);
	console.log("ERROR:", error);

	if (error.syscall !== "listen") {
		throw error;
	}

	var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server, name) {
	var addr = server.address();
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	console.log(`${name} is listening on ${bind}`);
}
