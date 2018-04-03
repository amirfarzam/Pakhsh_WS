var express = require('express');
var router = express.Router();
var moment = require('moment');
/* GET home page. */
router.all('/', function (req, res, next) {

    console.log('Message arrived!!!');
    console.log("params >>>>>>>>" + JSON.stringify(req.body));
    next();
});
module.exports = router;
