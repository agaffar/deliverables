var express = require('express');
//var router = express.Router();
var course = require('./course/course');
var path = require('path');
/* GET home page. */
var appRouter = function(router){
  router.get('/', function(req, res, next) {
    res.render(path.join(__dirname , '../../client/app/index'));
  });

}


module.exports = appRouter;
