/**
 * Created by SB004 on 3/20/2017.
 */
(function(){
    'use strict'
    angular.module('sumCamp.addCourse').controller('addCourseController',addCourseController);
    addCourseController.$inject = ['$scope','courseFactory','$state','SweetAlert'];
    function addCourseController($scope,courseFactory,$state,SweetAlert){
        var vm = this;
        vm.createCourse = createCourse;
        getCourseSlots();
        function getCourseSlots(){
            courseFactory.getCourseSlots().then(function (response) {
                    vm.courseSlots = response;
                },
                function(data){
                    console.log(data);
                });
        }
        function createCourse() {
            var query = {
                "courseName" : vm.cname,
                "description" : vm.cdesc,
                "duration" : vm.cduration,
                "noOfDays" :  vm.cNoDays,
                "coach" : vm.cCoach,
                "courseFee" : vm.cfees,
                "noStud" : vm.noStud,
            };
            query.courseSlots = getSelectedSlots(vm.courseSlots);
            courseFactory.createCourse(query).then(function(response){
                    if(response.status == "ok"){
                        SweetAlert.swal("Congrats","course added successfully","success");
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