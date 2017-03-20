/**
 * Created by SB004 on 3/20/2017.
 */
(function(){
    'use strict'
    angular.module('sumCamp.enroll').controller('enrollController',enrollController);
    enrollController.$inject = ['$scope','courseFactory','$stateParams','$state'];
    function enrollController($scope,courseFactory,$stateParams,$state){
        var vm = this;
        vm.enrollStudent = enrollStudent;
        vm.checkStudentExist = checkStudentExist;
        var courseId = $stateParams.courseId;
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
            query.timeSlotSelectedId = getSelectedTimeSlot(vm.course.courseSlots);
            query.courseId = courseId;
            console.log(query);
            courseFactory.enrollStudent(query).then(function(response){
                    if(response.status == "ok"){
                        alert("you are enrolled succesfully");
                        $state.go('home');
                    }
            },
            function(data){

            });
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
        function getSelectedTimeSlot(courseSlots){
            var slotId = "";
            console.log(courseSlots);
            for(var i =0;i<courseSlots.length;i++){
                if(courseSlots[i].selected == true){
                    return courseSlots[i]._id;
                }
            }
        }
    }

})();