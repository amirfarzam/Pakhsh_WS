

module.exports = function (req, res, next){
  if (!req.timedout) {
	  next();
  }else{
    res.send({
      settings : {
       success : 0,
       message : 'timeout!!Something happend!!wrong',
     } ,
     data :  []
    });
		// logger.error('timeout exceeded :', req.url , req.body);
  }
}
