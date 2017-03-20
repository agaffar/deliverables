var express = require('express');
var router = express.Router();
var course = require('../../utils/course.util')

/* GET home page. */

    router.post('/api/course/createcourse',course.createCourse);
    router.get('/api/course/getCourses',course.getCourses);
    router.get('/api/course/getCourseById',course.getCourseById);
    router.post('/api/course/enrollStudent',course.enrollStudent);
    router.get('/api/course/studentExists',course.studentExists);





module.exports = router;
