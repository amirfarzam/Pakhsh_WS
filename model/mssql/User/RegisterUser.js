var utils=require('../../dbutils');
var sql =  "IF NOT EXISTS (SELECT MobileNumber FROM [app].[Users] " +
    "WHERE MobileNumber = %s AND Deleted = 0) " +
    "BEGIN " +
    "   INSERT INTO [app].[Users] (FirstName, LastName, MobileNumber, Password, Activated, Deleted, CreatedDate) " +
    "   VALUES  (\'%s\', \'%s\', \'%s\', \'%s\', 1, 0, \'%s\') " +
    "END " +
    "ELSE " +
    "BEGIN " +
    "   UPDATE [app].[Users] " +
    "   SET FirstName = \'%s\', " +
    "   LastName =  \'%s\', " +
    "   MobileNumber = \'%s\', " +
    "   Password =  \'%s\', " +
    "   Activated = 1, " +
    "   Deleted = 0, " +
    "   ReCreatedDate =  \'%s\' " +
    "END;";

exports.RegisterUser= function (params , callback){
    utils.performaction({
        binds : [sql , params.Input.MobileNumber,
            params.Input.FirstName, params.Input.LastName, params.Input.MobileNumber, params.Input.Password, params.Input.NowDate,
            params.Input.FirstName, params.Input.LastName, params.Input.MobileNumber, params.Input.Password, params.Input.NowDate]
    } , function (err , result){
        callback(err , result) ;
    })
};