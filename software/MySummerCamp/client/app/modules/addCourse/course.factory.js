/**
 * Created by SB004 on 3/20/2017.
 */
(function () {
    'use strict'
    angular.module('sumCamp.addCourse').factory('courseFactory',['$q','api','$http',
        function courseFactory($q,api,$http){
        var courseFactory = {
            createCourse : createCourse,
            renderCourseDetails : renderCourseDetails,
            enrollStudent : enrollStudent,
            checkStudAlreadyEnrolled : checkStudAlreadyEnrolled,
            getCourseSlots : getCourseSlots
        }
        return courseFactory;
            function createCourse(query){
                return api.createCourse({q:query}).$promise;
            }
            function renderCourseDetails(query){
                return api.getCourse({q:query}).$promise;
            }
            function enrollStudent(query){
                return api.enrollStudent({q:query}).$promise;
            }
            function checkStudAlreadyEnrolled(query){
                return api.checkStudExits({q:query}).$promise;
            }
            function getCourseSlots(){
                var defered = $q.defer();
                $http({method: 'GET', url: '../../coursSlots.json'}).success(function(data, status, headers, config) {
                        var courseSlots = data;
                        defered.resolve(data);
                }).error(function(data,status){
                    defered.reject("error");
                });

                return defered.promise;
            }
    }]);

})();