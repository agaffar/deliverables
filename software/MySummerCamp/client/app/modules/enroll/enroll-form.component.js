/**
 * Created by SB004 on 3/22/2017.
 */
(function(){
    'use strict'
    angular.module('sumCamp.enroll').component('enrollForm',{
        bindings:{
            courseData :'=',
            enrollStudent:'&',
            checkStudentExist:'&',
            studAlreadEnrolled : '=',
            selectedSlot : '=',
            studEmail : '=',
            studentObject: '='


        },
        templateUrl:"app/partials/enroll-form.html",
        controller: enrollFormController,
        controllerAs:"efc",

    })
    enrollFormController.$inject = ['$scope'];
    function enrollFormController($scope){
        var vm = this;
        console.log(vm);
        console.log(typeof  vm.studAlreadEnrolled);

    }
})();