require("dotenv").config();

exports.config = {
	MONGO_URI:
		process.env.MONGO_URI_KH || "mongodb://localhost:27017/mern-boilerplate"
};
