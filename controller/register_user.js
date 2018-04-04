var express = require('express')
    , pass = MODELES.RegisterUser
    , router = express.Router()
    , moment = require('moment-jalaali') ;

router.all('/', function (req, res) {
    var Input = {
        FirstName: req.body.first_name,
        LastName: req.body.last_name,
        MobileNumber: req.body.mobile_number,
        Password: req.body.user_password,
        NowDate: moment().format("Y-M-D HH:mm:s")
    };
    pass.RegisterUser({ Input: Input }, function (err, result) {
        if (result.rowsAffected.length > 0)
            RESPOND.Response(err, {
                success: "1"
            }, res);
        else
            RESPOND.Response(err, {
                success: "0",
                message: CONSTANT.ErrorFormat.Register_User_Error
            }, res);
    })
});
module.exports = router;