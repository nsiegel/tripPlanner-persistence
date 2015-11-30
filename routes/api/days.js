var express = require('express');
var router = express.Router();

var models = require('../../models');
var Day = models.Day;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;


router.get('/api/days', function(req, res, next) {
  Day.find({}).populate('hotels restaurants activities').exec()
  .then(function(day) {
    res.send(day);
  }).then(null, next);
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
  Day.findOne({number: currentDay}).exec()
  .then(function(result){
  	if(!result){
  		Day.create({number: currentDay});
  	}
  });
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
  		if(sectionName === 'hotels'){
  			day[sectionName] = result._id;
  			day.save();
  		} else {
  			day[sectionName].push(result._id);
  			day.save();
  		}
  	});
  });

});

router.get('/test', function(req, res, next) {
  Day.find({}).populate('hotels restaurants activities').exec()
  .then(function(day) {
    res.send(day);
  });
  // Day.findOne({number: 1}).populate('hotels restaurants activities').exec()
  // .then(function(day) {
  //   res.send(day);
  // });
});





module.exports = router;
