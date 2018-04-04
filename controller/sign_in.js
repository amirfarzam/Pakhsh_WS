var express = require('express')
    , pass = MODELES.SignIn
    , router = express.Router()
    , rn = require('random-number')
    , dateTime = require('node-datetime')
    , Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: "2F6B6B6F6750755948393070724761553736434E63513D3D"
});
var gen = rn.generator({
    min: 111000
    , max: 999999
    , integer: true
});
var Status = "0";
router.all('/', function (req, res) {
    var Input = {
        Phone: req.body.phone
    };
    var firstNumber = Input.Phone.substring(0, 2);
    var ValidPhoneNumber = (firstNumber === "09" && Input.Phone.toString().length === 11);
    if (!ValidPhoneNumber) {
        RESPOND.Response(CONSTANT.ErrorFormat.Phone_Number_Error, {}, res);
        return;
    }
    var nowDate = dateTime.create();
    var formatted = nowDate.format('Y-m-d H:M:S');
    var afterOneHours = dateTime.create();
    afterOneHours.offsetInHours(1); // 1 hour in the future
    var formattedExpire = afterOneHours.format('Y-m-d H:M:S');
    var RandomCode = gen();
    pass.SignIn({
        Phone: Input.Phone,
        ActivationCode: RandomCode,
        CreatedDateTime: formatted,
        ExpireDateTime: formattedExpire
    }, function (err, result) {
        if (result.recordsets.length > 0) {
            RandomCode = result.recordset[0].ActivationCode
        }
        api.VerifyLookup({
            receptor: Input.Phone,
            token: RandomCode,
            template: "verify"
        }, function (response, status) {
            console.log(response);
            console.log(status);
            if (status == 200) {
                Status = "1"
            }
            if (Status === "1")
                RESPOND.Response(err, {
                    success: Status.toString()
                }, res);
            else
                RESPOND.Response(err, {
                    success: Status.toString(),
                    message: CONSTANT.ErrorFormat.Sign_In_Error
                }, res);
        });
    });
});
module.exports = router;
