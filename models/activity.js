var mongoose = require('mongoose');
var PlaceSchema = require('./place').schema;

var ActivitySchema = new mongoose.Schema({
  name: String,
  place: [PlaceSchema],
  age_range: String
});

module.exports = mongoose.model('Activity', ActivitySchema);
