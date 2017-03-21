var express = require('express');
//var router = express.Router();
var course = require('./course/course');
var path = require('path');
/* GET home page. */
var appRouter = function(router){
  router.get('/', function(req, res, next) {
    console.log(path.join(__dirname , '../../client/app/index'));

    res.render(path.join(__dirname , '../../client/app/index'));
  });
  //TODO: fix comment: Instead of writing the separate router for each, you can combine all together in app.js file and redirect directly to course.js
  router.get('/api/course/*',course);
  router.put('/api/course/*',course);
  router.post('/api/course/*',course);
  router.delete('/api/course/*',course);
  console.log('----approutes', router)
}


module.exports = appRouter;
