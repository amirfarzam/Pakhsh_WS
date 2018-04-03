var express = require('express');
var router = express.Router();
// var moment = require('moment');
var moment = require('moment-jalaali') ;

router.all('/', function(req, res, next) {
    var ridecange = {
        dtRideCancelledAt : moment().format("Y-M-D HH:mm:s")
        //persian date
        // dtRideCancelledAt : moment().format('jYYYY/jM/jD HH:mm')
    } ;
    res.send(ridecange.dtRideCancelledAt);
});

module.exports = router;
