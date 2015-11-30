var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
	address: String,
	city: String,
	state: String,
	phone: String,
	location: [Number]
});

module.exports = mongoose.model('Place', PlaceSchema);
