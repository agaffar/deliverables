var express = require('express');
var router = express.Router();
//TODO: fix comment: Unnecessary file
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
