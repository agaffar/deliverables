/**
 * Created by SB004 on 3/20/2017.
 */
(function () {
    'use strict'
    angular.module('sumCamp.home').controller('homeController',homeController);
    homeController.$inject = ['$scope','homeFactory','$state','NgTableParams','$filter'];
    function homeController($scope,homeFactory,$state,NgTableParams,$filter){
        var vm = this;
        var data = []
        vm.gotAddCourse = gotAddCourse;
        vm.enrollStudent = enrollStudent;
        loadCourseTable();

        function gotAddCourse(){
            $state.go('addCourse');
        }
        function loadCourseTable(){
            vm.tableParams = new NgTableParams({
                page :1,
                count : 5
            }, {

                counts: [2, 5, 10, 25, 50, 100],
                getData: function (params) {
                    console.log(params)
                    var query = {};
                    query.numberToSkip = (params.page() - 1) * (params.count());
                    console.log(query.numberToSkip);
                    query.limitTo = params.count();
                    query.sortingCriteria = params.sorting();
                    return homeFactory.getCourses(query).then(function (response) {

                            if (response.status == "ok") {
                                console.log(response)
                                vm.courses = response.data;
                                var coursesList = checkAvailability(vm.courses);
                                params.total(response.pagination.total);
                                var filterObj = params.filter(), filteredData = $filter('filter')(coursesList, filterObj);

                                var sortObj = params.sorting(), orderedData = $filter('orderBy')(filteredData, filterObj);
                                vm.data = orderedData;
                                //vm.data = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                                return vm.data;
                            }
                            else {
                                console.log("no data found");
                            }
                        },
                        function (data) {
                            console.log(data);
                        });
                }

            });
        }
        function checkAvailability(courses){

            for(var i = 0;i< courses.length;i++){
                var eachCourse =  courses[i];
                eachCourse.availableSeats = 0;
                for(var j=0;j<eachCourse.courseSlots.length;j++){
                    var slot = eachCourse.courseSlots[j];
                    console.log(eachCourse.courseSlots[j])
                    eachCourse.availableSeats = eachCourse.availableSeats + eachCourse.courseSlots[j].availableSlots;
                }
            }
            return courses;
        }
        function enrollStudent(course){

            $state.go('enrollStudent',{"courseId" : course._id});
        }
    }


})();