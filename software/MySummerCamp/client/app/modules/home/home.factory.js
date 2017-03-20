/**
 * Created by SB004 on 3/20/2017.
 */
(function () {
    'use strict'
    angular.module('sumCamp.home').factory('homeFactory',homeFactory);
    homeFactory.$inject = ['api'];
    function homeFactory(api){
        var homeFactoryServices = {
            getCourses : getCourses
        }
        return homeFactoryServices;
        function getCourses(query){
            return api.getCourses({q:query}).$promise;
        }
    }
})();