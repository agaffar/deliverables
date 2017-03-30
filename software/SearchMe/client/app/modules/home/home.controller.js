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
        vm.tableParams = new NgTableParams({ });
        vm.submitForm = submitForm;
        vm.reset = reset;

        function submitForm(){
            console.log(vm.user);
            var query = vm.user;
            loadTable(query);

        }
        function reset(){
            vm.user = {};
        }
        function  loadTable(query){
            vm.tableParams = new NgTableParams({
                page :1,
                count : 5
            }, {

                counts: [2, 5, 10, 25, 50, 100],
                getData: function (params) {
                    console.log(params)
                    query.pagination = {};
                    query.pagination.numberToSkip = (params.page() - 1)* params.count();
                    query.pagination.limito = params.count();
                    query.pagination.sortingCriteria = params.sorting();

                   return homeFactory.getSearchedData(query).then(function(response){
                            var dataReceived = response.data;
                            var modData = modularized(dataReceived);
                       console.log(modData);
                            var filterObj = params.filter(), filteredData = $filter('filter')(modData, filterObj);
                           console.log(filteredData);

                            var orderedData = $filter('orderBy')(filteredData, params.orderBy());
                            vm.data = orderedData;
                            console.log(orderedData);
                            //vm.data = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return vm.data;
                        },
                        function(error){

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
                    console.log(eachData);
                        user.addresses.push(eachData.addr);
                })
                data.push(user);
            });
            console.log(data);
            return data;
        }
    }
})();