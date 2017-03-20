/**
 * Created by SB004 on 3/20/2017.
 */
(function () {
    'use strict'
    angular.module('sumCamp.addCourse').factory('courseFactory',['$q','api',
        function courseFactory($q,api){
        var courseFactory = {
            createCourse : createCourse,
            renderCourseDetails : renderCourseDetails,
            enrollStudent : enrollStudent,
            checkStudAlreadyEnrolled : checkStudAlreadyEnrolled
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
    }]);

})();