/**
 * Created by SB004 on 3/20/2017.
 */
(function(){
    'use strict'
    angular.module('sumCamp.addCourse').controller('addCourseController',addCourseController);
    addCourseController.$inject = ['$scope','courseFactory','$state'];
    function addCourseController($scope,courseFactory,$state){
        var vm = this;
        vm.CreateCourse = CreateCourse;
        vm.courseSlots = [{'time':'6-7'},{'time':'7-8'},
            {'time':'9-10'},{'time':'10-11'}];
        function CreateCourse()
        {
            var query = {};
            query.courseName = vm.cname;
            query.description = vm.cdesc;
            query.duration = vm.cduration;
            query.noOfDays = vm.cNoDays;
            query.coach = vm.cCoach;
            query.courseFee = vm.cfees;
            query.noStud = vm.noStud;
            query.courseSlots = getSelectedSlots(vm.courseSlots);
            courseFactory.createCourse(query).then(function(response){
                    if(response.status == "ok"){
                        $state.go('home');
                    }
            },
            function(data){

            });


        }
        function getSelectedSlots(courseSlots){
            var selectedSlots = [];
            for(var i =0; i<courseSlots.length;i++){
                if(courseSlots[i].selected == true){
                    console.log(courseSlots[i].time);

                    selectedSlots.push(courseSlots[i]);
                }
            }

            return selectedSlots;
        }
    }
})();