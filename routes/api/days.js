var express = require('express');
var router = express.Router();

var models = require('../../models');
var Day = models.Day;

console.log(models.Day);

router.get('/getAllDays', function(req, res, next) {
  Day.find({}).exec().then(function(days) {
    res.send(days);
    // res.render('index', {all_days: days});
  });
});


module.exports = router;
