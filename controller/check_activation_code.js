var express = require('express')
    , pass = MODELES.CheckActivationCode
    , router = express.Router()
    , dateTime = require('node-datetime');

router.all('/', function (req, res) {
    nowDate = dateTime.create();
    formatted = nowDate.format('Y-m-d H:M:S');
    var Input = {
        Phone: req.body.phone,
        ActivationCode: req.body.activation_code
    };
    pass.CheckActivationCode({
        Phone: Input.Phone,
        ActivationCode: Input.ActivationCode,
        CreatedDateTime: formatted
    }, function (err, result) {
        // if(typeof result[0] != 'undefined' && result[0] != null)
        if (result.rowsAffected.length > 0)
            RESPOND.Response(err, {
                success: "1"
            }, res);
        else
            RESPOND.Response(err, {
                success: "0",
                message: CONSTANT.ErrorFormat.Active_Code_Error
            }, res);
    })
});
module.exports = router;
