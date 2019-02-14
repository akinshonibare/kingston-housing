import axios from "axios";

const getAllHouses = () => {
	return axios.get("/api/houses");
};

const getLatLong = address => {
	return axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+kingston+ontario&key=AIzaSyDsqSHrfGXsJxjEjpKTNP2IfYgYToNkp_o`
	);
};

const getHouse = id => {
	return axios.post("/api/houses", { id });
};
export { getAllHouses, getLatLong, getHouse };
