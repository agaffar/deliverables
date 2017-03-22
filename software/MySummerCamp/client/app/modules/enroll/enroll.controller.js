/**
 * Created by SB004 on 3/20/2017.
 */
(function(){
    'use strict'
    angular.module('sumCamp.enroll').controller('enrollController',enrollController);
    enrollController.$inject = ['$scope','courseFactory','$stateParams','$state','$window','SweetAlert'];
    function enrollController($scope,courseFactory,$stateParams,$state,$window,SweetAlert){
        var vm = this;
        var courseId = $stateParams.courseId;
        vm.studAlreadEnrolled = false;
        vm.studentObject = {};
        vm.enrollStudent = enrollStudent;
        vm.checkStudentExist = checkStudentExist;
        getCourseDetails(courseId);
        function getCourseDetails(courseId){
            var query = {};
            query.courseId = courseId;
            console.log(query);
            courseFactory.renderCourseDetails(query).then(function(response){
                    if(response.status == "ok"){
                        vm.course = response.data;
                        console.log(vm.course);
                    }
                },
                function(data){

                });
        }
        function enrollStudent(){
            var query = {};
            query.studentFirstName = vm.studentObject.fname;
            query.studentLastName = vm.studentObject.lname;
            query.studentEmailId = vm.emailId;
            checkStudentExist(query.studentEmailId);
            if(vm.studAlreadEnrolled === true){

                //$window.alert("you are already registered for another course");
                SweetAlert.swal("you are already registered for another course");

            }
            else {
                //TODO: fix comment: Samething at client end too. Write a utility method to check null-safe
                if(vm.selectedSlot == undefined || vm.selectedSlot ==null){
                    //$window.alert("select any slot available for you");
                    SweetAlert.swal("select any slot available for you");

                }
                else {
                    query.timeSlotSelectedId = getSelectedTimeSlot(vm.course.courseSlots);
                    query.courseId = courseId;
                    console.log(query);
                    console.log(vm.selectedSlot);
                    courseFactory.enrollStudent(query).then(function(response){
                            if(response.status == "ok"){
                                SweetAlert.swal("Congrats","you are enrolled succesfully","success");
                                $state.go('home');
                            }
                        },
                        function(data){

                        });
                }

            }

        }
        function checkStudentExist(studEmail){
            var query = {};
            query.emailId = studEmail;
            console.log(query);
            courseFactory.checkStudAlreadyEnrolled(query).then(function(response){
                    //console.log(response);
                    if(response.status == "ok"){
                        vm.studAlreadEnrolled = true;
                    }
                    else{
                        vm.studAlreadEnrolled = false;
                    }
                    //console.log(vm.studAlreadEnrolled)
                },
                function(data){

                });
        }
        //TODO: fix comment: In general this should be in utility method, like getObjectByKey(couseSlots, 'KEY=timeSlot', objectToCompare...)
        function getSelectedTimeSlot(courseSlots){
            var slotId = "";
            //console.log(courseSlots);
            for(var i =0;i<courseSlots.length;i++){
                if(courseSlots[i].timeSlot == vm.selectedSlot){
                    return courseSlots[i]._id;
                }
            }
        }
    }

})();