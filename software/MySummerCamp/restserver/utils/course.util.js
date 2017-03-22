/**
 * Created by SB004 on 3/20/2017.
 */
/**
 * Created by SB004 on 3/9/2017.
 */


//TODO: fix comment: The below all methods are service methods. So this implementation should be in ***.service.js file, not in util file
// Util js file should contain all kind of utility methods(Like plain operations which does not deal with database)
var express = require('express');
var courseModel = require('../models/CourseModel/courseModel');
var courseSlotModel = require('../models/courseSlotModel/CourseSlotModel');
var studentModel = require('../models/studentModel/studentModel');
var successResponse = require('../models/successResponse');
var errorResponse = require('../models/errorResponse');
var Q = require('q');
//TODO: fix comment: Combine below two lines
var courseData
courseData ={
    createCourse : createCourse,
    getCourses : getCourses,
    getCourseById : getCourseById,
    enrollStudent : enrollStudent,
    studentExists : studentExists

}
//TODO: fix comment: Remove console logs and commented codes
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
    //TODO: fix comment: Combine all below assignements into single line => courseObject = new CourseModel({couseName: ......})
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
    //TODO: fix comment: Same here--combine lines
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
                    //TODO: fix comment: For these kind of checks, you need to write a special util method : isEmpty() and make use of that
                    //In future you can utilize the third party plugin methods for doing this
                    if(response != undefined && response != null){
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
                        console.log(err1);
                        res.send(new errorResponse("error","somehing went wrong",err1));
                        console.log(err1);
                    }

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
    //TODO: fix comment: You need to move this to another js file and return back with the result. Here below call is not null-safe, So it'l fail.
    // So The method which you are updating should contain null-safe condition with appropriate populations
    //IMP: query population should be done at server end not from the client
    //Here you are querying the database directly with the values provided in query so it may cause the injection attacks
    courseModel.find({}).sort(query.sortingCriteria).populate('courseSlots').skip(query.numberToSkip).limit(query.limitTo)
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
                            console.log(response);
                            var data = response;
                            var pagination = {};
                            pagination.total = response1.length;
                            res.send(new successResponse("ok",data,pagination,"success"));
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