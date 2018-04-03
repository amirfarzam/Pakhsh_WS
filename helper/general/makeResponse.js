/**
 * New node file
 */
exports.Response = function (err, data, res) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Upgrade-Insecure-Requests", "1");
  //res.header("Access-Control-Allow-Headers", "Origin,X-Requested-with,Content-Type,Accept,*");
  // res.header("Access-Control-Allow-Headers", "Origin,X-Requested-with,Content-Type,Accept,obj_id,security_key,type,*");
  // res.header("Content-Type","application/json");
    // LOGGER.info(data, err);
    if (!err) {
        successResponse(data, res);
    } else {
        var success = data.success || '0';
        unsuccessResponse(err, success, res);
    }
};

function successResponse(data, res) {

    var message = CONSTANT.General_messageSucc.success;
    data.fields = data.fields || [];
    if (typeof data.message !== 'undefined') {
        message = data.message;
    }
    var mapData =
        {
            success: data.success || "1",
            message: message,
            fields: data.fields
        };
	if(typeof data.pageSize != 'undefined'){
      mapData.pageSize = data.pageSize ;
    }
    if (typeof data.paging !== 'undefined') {
        mapData.count = data.paging.count;
        mapData.curr_page = data.paging.curr_page;
        mapData.next_page = data.paging.next_page;
        mapData.prev_page = data.paging.prev_page;
        mapData.page_size = data.paging.page_size || 0;
        mapData.Total = data.paging.Total;
        mapData.Batch = data.paging.Batch;
    }
    var resp = {
        settings: mapData,
        data: data.data,
        config: data.config
    };
    res.send(JSON.stringify(resp));
}

function unsuccessResponse(data, success, res) {
    console.log('unsuccessResponse : ' + JSON.stringify(data));
    var message = data || 'constant.General_messageunSucc';
    if (typeof data.message !== 'undefined') {
        message = data.message;
    }

    var success = success || '0';
    var mapData =
        {
            success: success,
            message: message,
            fields: data.fields
        };
    var resp = {
        settings: mapData,
        data: []
    };
    if (typeof resp !== 'undefined') {
        res.send(JSON.stringify(resp));
    } else {
        res.send({
            settings: {
                success: success,
                message: message,
                fields: []
            },
            data: []
        });
    }

}
