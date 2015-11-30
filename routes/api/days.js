var express = require('express');
var router = express.Router();

var models = require('../../models');
var Day = models.Day;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;

console.log(models.Day);

router.get('/api/days', function(req, res, next) {
  Day.find({}).exec()
  .then(function(days) {
    res.send(days);
    // res.render('index', {all_days: days});
  });
});

router.get('/api/days/:day', function(req, res, next) {
  var day = req.params.day;
  Day.find({number: day}).exec()
  .then(function(days) {
    res.send(days);
    // res.render('index', {all_days: days});
  });
});

router.post('/api/days/:day', function(req, res, next) {
  var currentDay = req.params.day;
  console.log("Current day " + currentDay);
  Day.findOne({number: currentDay}).exec()
  .then(function(result){
  	console.log(result);
  	if(!result){
  		Day.create({number: currentDay});
  	}
  })
  next();
});


router.post('/api/days/:day/:sectionName', function(req, res, next) {

  var placeName = req.query.name;
  var currentDay = req.params.day;
  var searchName;
  var sectionName = req.params.sectionName;
  if(sectionName === 'hotels') searchName = Hotel;
  if(sectionName === 'restaurants') searchName = Restaurant;
  if(sectionName === 'activities') searchName = Activity;

	
  searchName.findOne({name: placeName}).exec()
  .then(function(result){
  	
  	Day.findOne({number: currentDay}).exec()
  	.then(function(day){
  		console.log("we're getting here");
  		if(sectionName === 'hotels'){
  			day[sectionName] = result._id;
  			console.log(day.sectionName);
  			day.save();
  		} else {
  			day[sectionName].push(result._id);
  			day.save();
  		}
  		
  	})
  })

});





module.exports = router;
