var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
var appRoute = function(router){
  router.get('/', function(req, res, next) {
    res.render(path.join(__dirname , '../../client/app/index'));
  });
}
module.exports = appRoute;
