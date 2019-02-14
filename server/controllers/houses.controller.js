const Houses = require("../models/Houses");

function getAllHouses(req, res) {
	console.log("getting houses");
	Houses.find({})
		.exec()
		.then(houses => res.json(houses))
		.catch(e => res.send(e));
}

function getHouse(req, res) {
	house_id = req.body.id;
	Houses.findById({ _id: house_id })
		.exec()
		.then(house => res.json(house))
		.catch(e => res.send(e));
}

async function getFilters(req, res) {
	var results = [];
	try {
		results[0] = await Houses.distinct("beds");
		results[1] = await Houses.distinct("baths");
	} catch (err) {
		console.log(err);
	}
	response = await Promise.all([results[0], results[1]]);
	res.json({ data: response });
}
module.exports = {
	getFilters,
	getAllHouses,
	getHouse
};
