var path = require("path");
var express = require("express");
var logger = require("morgan");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var httpProxy = require("http-proxy");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");

var indexRouter = require("./routes/index");

require("dotenv").config();
var app = express();

const apiProxy = httpProxy.createProxyServer({
	target: "http://localhost:" + String(Number(process.env.PORT) + 1 || 5001)
});

app.use("/api", (req, res) => {
	apiProxy.web(req, res);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "5000mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "5000mb",
		extended: true,
		parameterLimit: 50000
	})
);
app.use(cookieParser());

// if (process.env.NODE_ENV === "production") {
// 	app.get("/", (req, res) => {
// 		res.render("index.ejs");
// 	});
// }

app.use(express.static(path.join(__dirname, "client/build")));
app.use(
	expressSession({ secret: "SECRET", saveUninitialized: true, resave: true })
);

if (process.env.NODE_ENV === "production") {
	app.get("*", (req, res) => res.render("index.ejs"));
}

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
