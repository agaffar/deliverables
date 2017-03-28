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

        function submitForm(){
            console.log(vm.user);
            var query = vm.user;
            loadTable(query);

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

                    homeFactory.getSearchedData(query).then(function(response){
                            var dataReceived = response.data;
                            var filterObj = params.filter(), filteredData = $filter('filter')(dataReceived, filterObj);

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
    }
})();