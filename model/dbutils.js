var sql = require('mssql');
var util = require('util');
exports.getallwithcache = function (params, callback) {
    CACHE.getvalue(params.key, function (err, cacherest) {
        if (!err && cacherest !== null) {
            callback(null, cacherest);
        } else {
            DBselect(params, function (err, dbresult) {
                if (err) {
                    LOGGER.error(dbresult);
                    callback(err);
                } else {
                    if (typeof dbresult !== undefined) {
                        CACHE.setvalue({
                            key: params.key,
                            value: dbresult,
                            expire: params.livetime
                        }, function (err, rest) {
                        });
                    }
                    callback(null, dbresult)
                }
            })
        }
    });
};

exports.setvaluewithcache = function (params, callback) {
    DBselect(params, function (err, dbresult) {
        if (err) {
            LOGGER.error(dbresult);
            //    var nerr=new Error('sdfsdf');
            callback(err);
        } else {
            if (typeof dbresult !== undefined) {
                CACHE.setvalue({
                    key: params.key,
                    value: params,
                    expire: params.livetime
                }, function (err, rest) {
                });
            }
            callback(null, dbresult)
        }
    })
};

exports.performaction = function (params, callback) {
    DBselect(params, function (err, dbresult) {
        if (err) {
            callback(err);
        } else {
            callback(null, dbresult)
        }
    });
};
var config = {
    user: 'sa',
    password: '123',
    server: '192.168.1.53',
    port: 1433,
    database: 'Pakhsh'
};

function DBselect(params, dbresult) {
    var connection = new sql.connect(config, function (err) {
        if (err) console.log(err);
        var sq = util.format.apply(util, params.binds);
        // var sq = util.format(params.sql, params.binds);
        var request = new sql.Request(connection);
        request.query(sq, function (err, recordset) {
            if (err) console.log(err);
            console.dir(recordset);
            dbresult(err, recordset);
            sql.close();
        });
    });

}

