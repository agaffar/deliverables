var express = require('express');
var router = express.Router();
var user = require('../services/user.service')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/api/user/data',user.getDataSearched);

module.exports = router;
