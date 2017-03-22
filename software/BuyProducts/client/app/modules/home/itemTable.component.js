/**
 * Created by SB004 on 3/21/2017.
 */
(function(){
    'use strict'
    angular.module('buyProd.home').component('itemTable',{
        bindings:{
            itemList :'=',
        },
        templateUrl:"app/partials/itemtable.html",
        controller: itemTableController,
        controllerAs:"itc"
    });
    itemTableController.$inject = ['NgTableParams','$filter','$state'];
    function itemTableController(NgTableParams,$filter,$state){
                var vm = this;
    }
})();