
var utils=require('../../dbutils');
var sql =  "select name from Stuff where ID < %s";
exports.suff= function (params , callback){
    utils.performaction({
        binds : [sql ,params.tell]
    } , function (err , result){
        callback(err , result) ;
    })
}