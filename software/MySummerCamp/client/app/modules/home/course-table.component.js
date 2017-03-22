/**
 * Created by SB004 on 3/22/2017.
 */
(function(){
    'use strict'
    angular.module('sumCamp.home').component('courseTable',{
        bindings:{
            tableParams :'=',
            enrollStudent : '&',
            gotAddCourse : '&'

        },
        templateUrl:"app/partials/course-table.html",
        controller: courseTableController,
        controllerAs:"ctc",

    });
    courseTableController.$inject = ['$scope'];
    function courseTableController($scope){
        var vm = this;
        console.log(vm);
    }
})();