var express = require('express');
var router = express.Router();
var path = require('path');
var products = require('./products');
/* GET home page. */
var appRoute = function(router){
  router.get('/', function(req, res, next) {
    res.render(path.join(__dirname , '../../client/app/index'));
  });
  router.get('/api/products/*',products);
  router.post('/api/products/*',products);
  router.put('/api/products/*',products);
  router.delete('/api/products/*',products);

}


module.exports = appRoute;
