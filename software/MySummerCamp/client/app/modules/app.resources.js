/**
 * Created by SB004 on 3/20/2017.
 */

(function(){
    'use strict';
    angular.module('sumCamp').factory('api', api);
    api.$inject = ['$resource','$rootScope'];
    //clinical trail API for data calls
    function api ($resource, $rootScope) {
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }
    //default parameters will go here..
    var getParamDefaults = function() {
        return {
            id:'@id'
        };
    };

    var getActions = function() {
        return {
            'createCourse':{
                method : 'POST',
                url: '/api/course/createcourse'
            },
            'getCourses':{
                method : 'get',
                url: '/api/course/getCourses'
            },
            'getCourse':{
                method : 'get',
                url: '/api/course/getCourseById'
            },
            'enrollStudent':{
                method : 'POST',
                url: '/api/course/enrollStudent'
            },

            'checkStudExits':{
                method : 'GET',
                url: '/api/course/studentExists'
            }

        }
    }
}());
