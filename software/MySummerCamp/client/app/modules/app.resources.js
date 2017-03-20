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
            },
            'logout':{
                method : 'DELETE',
                url: '/api/users/logout'
            },
            'forgotPassword':{
                method : 'POST',
                url: '/api/users/forgotPassword'
            },
            'resetPassword':{
                method : 'PUT',
                url: '/api/users/resetpassword'
            },
            'topRatedProducts':{
                method : 'GET',
                url: '/api/products/topRatedProducts'
            },
            'searchProducts':{
                method : 'GET',
                url: '/api/products/search'
            },
            'productsByCategory':{
                method : 'GET',
                url: '/api/products/category'
            },
            'getAllBrandsByType':{
                method : 'GET',
                url: '/api/products/brands'
            },
            'getProduct':{
                method : 'GET',
                url: '/api/products/viewproduct'
            },
            'getSimilarProducts':{
                method : 'GET',
                url: '/api/products/viewproduct/similarProducts'
            },
            'getUserData':{
                method : 'GET',
                url: '/api/users/user/getProfile'
            },
            'saveUserData':{
                method : 'PUT',
                url: '/api/users/user/saveProfiles'
            },
            'getUserAddress':{
                method : 'GET',
                url: '/api/users/user/getAddress'
            },
            'SaveAddress':{
                method : 'POST',
                url: '/api/users/user/saveAddress'
            },
            'deleteAddress' : {
                method : 'DELETE',
                url: '/api/users/user/deleteAddress'
            }
        }
    }
}());
