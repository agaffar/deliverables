/**
 * Created by SB004 on 3/28/2017.
 */
(function(){
    'use strict'
    angular.module('searchMe.home').controller('homeController',homeController);
    homeController.$inject = ['$scope','homeFactory','NgTableParams','$filter'];
    function homeController($scope,homeFactory,NgTableParams,$filter){
        var vm = this;
        vm.user = {};
        vm.data = [];
        vm.submitForm = submitForm;
        vm.reset = reset;
        vm.loadTable = loadTable;
        vm.loadTable();
        function submitForm(){

        vm.tableParams.reload();

        }
        function reset(){
            vm.user = {};
        }
        function  loadTable(){
            vm.tableParams = new NgTableParams({
                page :1,
                count : 5
            }, {
                counts: [2, 5, 10, 25, 50, 100],
                getData: function (params) {
                    console.log("in get data");
                    var query = angular.copy(vm.user);
                    query.pagination = {};
                    query.pagination.numberToSkip = (params.page() - 1)* params.count();
                    query.pagination.limito = params.count();
                    query.pagination.sortingCriteria = params.sorting();
                    console.log("before getSearchedData..");

                     return homeFactory.getSearchedData(query).then(function(response){
                            console.log("in searched data");
                            if(response.status == "ok"){
                                var dataReceived = response.data;
                                var modData = modularized(dataReceived);
                                params.total(response.pagination.total);
                                var filterObj = params.filter(), filteredData = $filter('filter')(modData, filterObj);
                                var orderedData = $filter('orderBy')(filteredData, params.orderBy());
                                vm.data = orderedData;
                                //vm.data = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                return vm.data;
                            }
                        },
                        function(error){
                                console.log("in herrrrrr");
                        });

                }

            });

        }
        function modularized(dataReceived){
            var data = [];
            angular.forEach(dataReceived,function(eachUser){
                var user = {};
                user.firstName = eachUser.users.firstName;
                user.lastName = eachUser.users.lastName;
                user.dateOfBirth = eachUser.users.dateOfBirth;
                user.addresses = [];
                angular.forEach(eachUser.data,function(eachData){
                    user.addresses.push(eachData.addr);
                })
                data.push(user);
            });
            return data;
        }
    }
})();