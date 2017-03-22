/**
 * Created by SB004 on 3/21/2017.
 */
(function () {
    'use strict'
    angular.module('buyProd.home').controller('homeController',homeController);
    homeController.$inject = ['$scope','$state','homeFactory','NgTableParams','$filter'];
    function homeController($scope,$state,homeFactory,NgTableParams,$filter){
        var vm = this;
        vm.productList = [];
        vm.yourOrders = [];
        vm.totalBill = 0;
        vm.tableParams = {};
        vm.refreshProds = refreshProds;
        vm.addProduct = addProduct;
        vm.updateCost = updateCost;
        vm.proceedPay = proceedPay;
        loadProductsTable();
        function refreshProds(valueEntered){
            vm.productList = [];
            if(valueEntered.selected != ""){
                var query = { "valueEntered" : valueEntered.selected  };
                homeFactory.searchProducts(query).then(function (response) {
                        if(response.status == "ok"){
                            console.log(response);
                            vm.productList = response.data;
                        }
                    },
                    function(data){

                    });
            }

        }
        function addProduct(selected){
            var item = {
                "product" : selected._id,
                "productName" : selected.name,
                "quantity" : 1,
                "cost" : selected.price,
                "totalCost" : selected.price
            };
            console.log(item);
            vm.yourOrders.push(item);
            vm.tableParams.reload();
        }
        function loadProductsTable() {
            vm.tableParams = new NgTableParams({
                page :1,
                count : 5
            }, {

                counts: [2, 5, 10, 25, 50, 100],
                getData: function (params) {
                    console.log(params)
                    getBill(vm.yourOrders);
                    var filterObj = params.filter(), filteredData = $filter('filter')(vm.yourOrders, filterObj);

                    var orderedData = $filter('orderBy')(filteredData, params.orderBy());;
                    vm.data = orderedData;
                    console.log(orderedData);
                    //vm.data = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    return vm.data;
                }

            });
        }
        function getBill(yourOrders){
            vm.totalBill = 0;
            angular.forEach(yourOrders,function(eachOrder){
                vm.totalBill = vm.totalBill + eachOrder.totalCost;
            });
        }
        function updateCost(item){

            item.totalCost = item.quantity* item.cost;

            getBill(vm.yourOrders);
        }
        function proceedPay(){
            var currentDate = Date.now();
            var query = {
                "listItems" : vm.yourOrders,
                "purchasedBy" : "sridhar thumma",
                "purchasedOn" : currentDate,
                "totalBill" : vm.totalBill
            };
            console.log(query);
            homeFactory.proceedToPay(query).then(function(response){
                    if(response.status == "ok"){
                        console.log(response);
                        var billId = response.data;
                        $state.go('billDetails',{"billId" : billId });
                    }
                },
                function(data){

                });
        }
    }

})();