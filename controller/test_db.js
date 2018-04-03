var express = require('express')
    , pass = MODELES.stuff
    , router = express.Router();

router.all('/', function (req, res) {
    pass.suff({
        tell: 10
        // number : 123
    }, function (err, result) {
        RESPOND.Response(err, {
            success : "0",
            message: CONSTANT.authorized.failure_1,
            data: result.recordset,
        }, res)
    })
});
module.exports = router
