/**
 * Created by SB004 on 3/21/2017.
 */

(function(){
    'use strict';
    angular.module('buyProd').factory('api', api);
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
            'searchProduct':{
                method : 'GET',
                url: '/api/products/searchProduct'
            },
            'proceedToPay':{
                method : 'POST',
                url: '/api/products/payBill'
            },
            'getBillDetails':{
                method : 'get',
                url: '/api/products/getBillDetails'
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
