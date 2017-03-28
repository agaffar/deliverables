/**
 * Created by SB004 on 3/20/2017.
 */

(function(){
    'use strict';
    angular.module('searchMe').factory('api', api);
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

            'getDataSearched':{
                method : 'get',
                url: '/api/user/data'
            }

        }
    }
}());
