/**
 * Created by SB004 on 3/28/2017.
 */
(function () {
    'use strict'
    angular.module('searchMe.home').component('searchForm',{
        bindings:{
            user :'=',
            submitForm : '&',
            reset : '&'

        },
        templateUrl:"app/partials/searchForm.html",
        controller: searchFormController,
        controllerAs:"sfc",

    });
    function searchFormController(){
        var vm = this;
    }
})();