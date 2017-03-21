/**
 * Created by SB004 on 3/20/2017.
 */
(function(){
    'use strict'
    angular.module('sumCamp.enroll').controller('enrollController',enrollController);
    enrollController.$inject = ['$scope','courseFactory','$stateParams','$state','$window'];
    function enrollController($scope,courseFactory,$stateParams,$state,$window){
        var vm = this;
        var courseId = $stateParams.courseId;
        vm.enrollStudent = enrollStudent;
        vm.checkStudentExist = checkStudentExist;
        //TODO: fix comment: Initialization of variables first, method declaration next, then method definition
        getCourseDetails(courseId);
        vm.uncheck = function (slots) {
            console.log("slotssss")
            slots.selected = !slots.selected;
        }
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
            query.studentFirstName = vm.fname;
            query.studentLastName = vm.lname;
            query.studentEmailId = vm.emailId;
            if(checkStudentExist(query.studentEmailId)){
                //TODO: fix comment: Going forward you should not use window alerts
                $window.alert("you are already registered for another course");
            }
            else {
                //TODO: fix comment: Samething at client end too. Write a utility method to check null-safe
                if(vm.selectedSlot == undefined || vm.selectedSlot ==null){
                    $window.alert("select any slot available for you");

                }
                else {
                    query.timeSlotSelectedId = getSelectedTimeSlot(vm.course.courseSlots);
                    query.courseId = courseId;
                    console.log(query);
                    console.log(vm.selectedSlot);
                    courseFactory.enrollStudent(query).then(function(response){
                            if(response.status == "ok"){
                                alert("you are enrolled succesfully");
                                $state.go('home');
                            }
                        },
                        function(data){

                        });
                }

            }

        }
        function checkStudentExist(){
                var query = {};
                query.emailId = vm.emailId;
            console.log(query);
            courseFactory.checkStudAlreadyEnrolled(query).then(function(response){
                if(response.status == "ok"){
                    vm.studAlreadEnrolled = true;
                }
                else{
                    vm.studAlreadEnrolled = false;
                }
            },
            function(data){

            });
        }
        //TODO: fix comment: In general this should be in utility method, like getObjectByKey(couseSlots, 'KEY=timeSlot', objectToCompare...)
        function getSelectedTimeSlot(courseSlots){
            var slotId = "";
            console.log(courseSlots);
            for(var i =0;i<courseSlots.length;i++){
                if(courseSlots[i].timeSlot == vm.selectedSlot){
                    return courseSlots[i]._id;
                }
            }
        }
    }

})();