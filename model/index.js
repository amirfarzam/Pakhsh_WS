var path = require('path');
var fs = require('fs');

var walkSync = function(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = [];
  files.forEach(function(file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
          filelist = walkSync(path.join(dir, file), filelist);
      }
      else {
          filelist.push(path.join(dir, file));
          if (file.match(/\.js$/) !== null && file !=='db.js' && file !=='cache.js' ) {
            var name = file.replace('.js', '');
            //address =  dir.replace(__dirname, '.') + '/' + name;
            address =  dir.replace(__dirname+'/\/', '.') + '/' + name;
            console.log( name , address) ;
            exports[name] = require(address);
          }
      }
  });
  return filelist;
};

var oracleList = walkSync ( __dirname + '/mssql/' , oracleList )
