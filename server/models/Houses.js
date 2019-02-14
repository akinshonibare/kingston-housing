var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HousesSchema = new Schema(
	{
		url: String,
		address: String,
		price: String,
		beds: String,
		bath: String,
		img: String,
		type: String
	},
	{
		versionKey: false
	}
);

const Houses = mongoose.model("Houses", HousesSchema, "houses");
module.exports = Houses;
