var utils = require('../../dbutils');

var sql = "IF NOT EXISTS (SELECT * FROM [app].[Tmp_ActivationCode] " +
    "WHERE PhoneNumber = \'%s\' " +
    "AND CreatedDateTime <= \'%s\' " +
    "AND ExpirationDateTime >= \'%s\' " +
    "AND Used = 0) " +
    "BEGIN " +
    "      INSERT INTO [app].[Tmp_ActivationCode] " +
    "      (PhoneNumber, ActivationCode, CreatedDateTime, ExpirationDateTime, Used) " +
    "      VALUES (\'%s'\, \'%s'\ , \'%s'\, \'%s'\, 0) " +
    "END " +
    "ELSE BEGIN SELECT ActivationCode FROM [app].[Tmp_ActivationCode] " +
    "WHERE PhoneNumber = \'%s\' " +
    "AND CreatedDateTime <= \'%s\' " +
    "AND ExpirationDateTime >= \'%s\' " +
    "AND Used = 0 END";

exports.SignIn = function (params, callback) {
    utils.performaction({
        binds: [sql, params.Phone, params.CreatedDateTime, params.CreatedDateTime,
            params.Phone, params.ActivationCode, params.CreatedDateTime, params.ExpireDateTime,
            params.Phone, params.CreatedDateTime, params.CreatedDateTime]
    }, function (err, result) {
        callback(err, result);
    })
};