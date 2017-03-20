/**
 * Created by SB004 on 3/20/2017.
 */
/**
 * Created by SB004 on 3/9/2017.
 */

var express = require('express');
var courseModel = require('../models/CourseModel/courseModel');
var courseSlotModel = require('../models/courseSlotModel/CourseSlotModel');
var studentModel = require('../models/studentModel/studentModel');
var successResponse = require('../models/successResponse');
var errorResponse = require('../models/errorResponse');
var Q = require('q');
var courseData
courseData ={
    createCourse : createCourse,
    getCourses : getCourses,
    getCourseById : getCourseById,
    enrollStudent : enrollStudent,
    studentExists : studentExists

}
function createCourse(req,res){
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(query);
    console.log("in in user profile type "+query.userId)

    console.log(req.query);
    console.log(req.body);
    var courseObject = new courseModel();
    /*query.courseName = vm.cName;
     query.description = vm.cdesc;
     query.duration = vm.cduration;
     query.noOfDays = vm.cNoDays;
     query.coach = vm.cCoach;
     query.noStud = vm.noStud;
    * */
    courseObject.courseName = query.courseName;
    courseObject.description = query.description;
    courseObject.courseName = query.courseName;
    courseObject.duration = query.duration;
    courseObject.noOfDays = query.noOfDays;
    courseObject.coach = query.coach;
    courseObject.courseFee = query.courseFee;
    courseObject.courseSlots = [];
    var promises = [];
    query.courseSlots.forEach(function(eachSlot) {
        //console.log(allProducts[j]);
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
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(query);

    var student = new studentModel();

    student.firstName = query.studentFirstName;
    student.lastName = query.studentLastName;
    student.email = query.studentEmailId;

    student.course = query.courseId;
    student.save(function(err){
        if(err){
            console.log(err);
            res.send(new errorResponse("error","somehing went wrong",err));
        }else{
            courseSlotModel.findOne({_id :  query.timeSlotSelectedId}).exec(function(err1,response){
                if(err1){
                    console.log(err1);
                    res.send(new errorResponse("error","somehing went wrong",err1));
                }else {
                        response.availableSlots = response.availableSlots -1;
                        response.save(function(err2){
                            if(err2)
                            {
                                console.log(err2);
                                res.send(new errorResponse("error","somehing went wrong",err2));
                            }else {
                                res.send(new successResponse("ok","valid",{},"success fully enrolled"));
                            }
                        })
                }
            })
        }
    })


}
function getCourses(req,res){
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(query);
    console.log("in in user profile type "+query.userId)

    console.log(req.query);
    console.log(req.body);
    courseModel.find({}).populate({path : 'courseSlots',options: {
            skip : query.numberToSkip, limit : query.limitTo, sort: query.sortingCriteria }})
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
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(query);
    console.log("in in user profile type "+query.emailId)

    console.log(req.query);
    console.log(req.body);
    studentModel.findOne({email : query.emailId}).populate('course').exec(function(err, response){
            if(err){

                res.send(new errorResponse("error","no query formed properly",err));
                console.log(err);
            }
            else{
                console.log("response");
                if(response != undefined && response != null)
                {
                    console.log(response);
                    var data = response;
                    res.send(new successResponse("ok",data,{},"success"));
                }
                else {
                    res.send(new errorResponse("error","no data found properly",err));
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