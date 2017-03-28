/**
 * Created by SB004 on 3/21/2017.
 */
(function(){
    'use strict'
    angular.module('buyProd.home').component('itemTable',{
        bindings:{
            tableParams :'=',
            totalBill : '=',
            yourOrders : '=',
            proceedPay : '&',
            updateCost : '&'
        },
        templateUrl:"app/partials/item-table.html",
        controller: itemTableController,
        controllerAs:"itc"
    });
    itemTableController.$inject = ['NgTableParams','$filter','$state'];
    function itemTableController(NgTableParams,$filter,$state){
                var vm = this;

    }
})();