/**
 * Created by SB004 on 3/20/2017.
 */
var async = require('async');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var fs = require("fs");
var courseModel=require('./models/CourseModel/courseModel');
var courseSlotModel=require('./models/CourseSlotModel/CourseSlotModel');

var Q = require('q');

var dateFormat = require('dateformat');
var moment = require('moment');
mongoose.connect('mongodb://localhost/myshoppingCart');
var db = mongoose.connection;
var dbCollection = db.collections;
console.log("connected and collections are : "+dbCollection);
//console.log(dbCollection);
console.log("\n *STARTING* \n");
// Get content from file
var courses = [
    {
        courseName: "c",
        courseFee: 2000,
        description: "we provide the c course in summer camp",
        duration: "2hr",
        noOfDays: 10,
        coach: "gaffar"
    }
    ,
    {
        courseName: "java",
        courseFee: 1000,
        description: "we provide the java course in summer camp",
        duration: "2hr",
        noOfDays: 10,
        coach: "abdul"
    }
];
var courseSlots = [{timeSLot : "6-7",noOfStudents : 10,availableSlots : 10},
    {timeSLot : "7-8",noOfStudents : 10,availableSlots : 10},
    {timeSLot : "9-10",noOfStudents : 10,availableSlots : 10},
    {timeSLot : "10-11",noOfStudents : 10,availableSlots : 10}
 ];
for(var i=0;i<courseSlots.length;i++){
    var eachCourseSlot = courseSlots[i];
    insertCourseSlots(eachCourseSlot);
}
for(var i=0;i<courses.length;i++){
    insertCourses(courses[i],courseSlots);
}

function insertCourses(eachCourse,courseSlots){

    eachProduct.comments.forEach(function(eachComment) {
        promises.push(insertCommentToModel(newProduct, eachComment));
    });
    Q.allSettled( promises ).then(function (resp) {
        var product = ProductModel(newProduct);
        //console.log(newProduct);
        product.save(function (err) {
            if (err) {
                console.log(err);
                //return err;
            }
            else {
                console.log("products saved");
            }
        });
    });
}