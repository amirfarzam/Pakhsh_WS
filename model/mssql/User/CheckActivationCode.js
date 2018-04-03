var utils=require('../../dbutils');
var sql =  "UPDATE [app].[Tmp_ActivationCode] "+
"SET Used = 1 "+
"WHERE PhoneNumber = \'%s\' "+
"AND CreatedDateTime <= \'%s\' "+
"AND ExpirationDateTime >= \'%s\' "+
"AND ActivationCode = %s "+
"AND Used = 0";

exports.CheckActivationCode= function (params , callback){
    utils.performaction({
        binds : [sql ,params.Phone, params.CreatedDateTime, params.CreatedDateTime, params.ActivationCode]
    } , function (err , result){
        callback(err , result) ;
    })
};