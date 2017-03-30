/**
 * Created by SB004 on 3/28/2017.
 */
(function(){
    'use strict'
    angular.module('searchMe.home').component('resultTable',{
        bindings:{
            tableParams :'='

        },
        templateUrl:"app/partials/result-table.html",
        controller: resultTableController,
        controllerAs:"rtc",

    });
    resultTableController.$inject = [];
    function resultTableController(){
        var vm = this;

    }
})();