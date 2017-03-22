/**
 * Created by SB004 on 3/22/2017.
 */
(function(){
'use strict'
    angular.module('buyProd.home').component('searchProd',{
        bindings:{
            productList :'=',
            addProduct : '&',
            refreshProds : '&'
        },
        templateUrl:"app/partials/search-prod.html",
        controller: searchProdController,
        controllerAs:"search",

    });
    searchProdController.$inject = ['$scope'];
    function searchProdController($scope){
        var vm = this;
    }
})();