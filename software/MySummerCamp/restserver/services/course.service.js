/**
 * Created by SB004 on 3/20/2017.
 */

var express = require('express');
var Q = require('q');
var courseModel = require('../models/CourseModel/courseModel');
var courseSlotModel = require('../models/CourseSlotModel/CourseSlotModel');
var studentModel = require('../models/studentModel/studentModel');
var successResponse = require('../models/successResponse');
var errorResponse = require('../models/errorResponse');
var commonUtil = require('./../utils/commonUtil.util.js');
var courseData ={
    createCourse : createCourse,
    getCourses : getCourses,
    getCourseById : getCourseById,
    enrollStudent : enrollStudent,
    studentExists : studentExists

}
function createCourse(req,res){

    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    var courseObject = new courseModel(
        {
            "courseName" : query.courseName,
            "description" : query.description,
            "courseName" : query.courseName,
            "duration" : query.duration,
            "noOfDays" : query.noOfDays,
            "coach" : query.coach,
            "courseFee" : query.courseFee
        }
    );
    courseObject.courseSlots = [];
    var promises = [];
    query.courseSlots.forEach(function(eachSlot) {
        promises.push(insertSlot(courseObject,eachSlot,query.noStud));
    });
    Q.allSettled(promises).then(function(resp){
        courseObject.save(function(err){
            if(err){
                console.log(err);
                res.send(new errorResponse("error","no proper db connection",err));
            }
            else {
                res.send(new successResponse("ok",{},{},"successfully created course"));
            }
        })
    });

}
function enrollStudent(req,res){
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    var student = new studentModel(
        {
            "firstName" : query.studentFirstName,
            "lastName" : query.studentLastName,
            "email" : query.studentEmailId,
            "course" : query.courseId
        }
    );
    student.save(function(err){
        if(err){
            console.log(err);
            res.send(new errorResponse("error","somehing went wrong",err));
        }else{
            courseSlotModel.findOne({_id :  query.timeSlotSelectedId}).exec(function(err1,response){
                if(err1){
                    console.log(err1);
                    res.send(new errorResponse("error","query Wrong",err1));
                }else {
                    if(commonUtil.isEmpty(response) != true){
                        response.availableSlots = response.availableSlots -1;
                        response.save(function(err2){
                            if(err2)
                            {
                                res.send(new errorResponse("error","somehing went wrong",err2));
                                console.log(err2);
                            }else {
                                res.send(new successResponse("ok","valid",{},"success fully enrolled"));
                            }
                        })
                    }else {
                        res.send(new errorResponse("error","wrong inputs",err1));
                        console.log(err1);
                    }

                }
            })
        }
    })


}
function getCourses(req,res){

    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    var numberToSkip = query.numberToSkip;
    var limitTo = query.limitTo;


    courseModel.find({}).sort(query.sortingCriteria).populate('courseSlots').skip(numberToSkip).limit(limitTo)
        .exec(function(err, response){
            if(err){
                console.log(err);
                res.send(new errorResponse("error","no query formed properly",err));
            }
            else{
                courseModel.find({}).populate('courseSlots')
                    .exec(function(err1, response1){
                        if(err1){
                            console.log(err);
                            res.send(new errorResponse("error","no query formed properly",err));
                        }
                        else {
                            console.log("response");
                            if(commonUtil.isEmpty(response) != true){
                                var data = response;
                                var pagination = {};
                                pagination.total = response1.length;
                                res.send(new successResponse("ok",data,pagination,"success"));
                            }
                            else{
                                res.send(new errorResponse("error","no data found",err));
                            }

                        }
                    });

            }
        });


}
function getCourseById(req,res){
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(query);
    console.log("in in user profile type "+query.userId)

    console.log(req.query);
    console.log(req.body);
    courseModel.findOne({_id : query.courseId}).populate('courseSlots')
        .exec(function(err, response){
            if(err){
                console.log(err);
                res.send(new errorResponse("error","no query formed properly",err));
            }
            else{
                console.log("response");
                console.log(response);
                var data = response;
                res.send(new successResponse("ok",data,{},"success"));
            }
        });


}
function studentExists(req,res){

    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    studentModel.findOne({email : query.emailId}).populate('course').exec(function(err, response){
        if(err){

            res.send(new errorResponse("error","no query formed properly",err));
            console.log(err);
        }
        else{
            console.log("response");
            if(commonUtil.isEmpty(response) != true)
            {
                console.log(response);
                var data = response;
                res.send(new successResponse("ok",data,{},"success"));
            }
            else {
                res.send(new errorResponse("error","emailNotExists",err));
            }

        }
    });


}
function insertSlot(courseObject,eachSlot,noStuds){
    var defered = Q.defer();
    var courseSlotObject = new courseSlotModel();
    courseSlotObject.timeSlot = eachSlot.time;
    courseSlotObject.availableSlots = noStuds;
    courseSlotObject.noOfStudents = noStuds;
    courseSlotObject.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            courseObject.courseSlots.push(courseSlotObject._id);
            defered.resolve();

        }
    });
    return defered.promise;
}

module.exports = courseData;