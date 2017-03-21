/**
 * Created by SB004 on 3/21/2017.
 */
(function(){
    'use strict'
    angular.module('buyProd.home').factory('homeFactory',homeFactory);
    homeFactory.$inject = ['$http','api'];
    function homeFactory($http,api){
        var homeFactoryServices = {
            searchProducts : searchProducts,
            proceedToPay : proceedToPay,
            getBillDetails : getBillDetails
        };
        return homeFactoryServices;
        function searchProducts(query){
            return api.searchProduct({q:query}).$promise;
        }
        function proceedToPay(query){
            return api.proceedToPay({q:query}).$promise;
        }
        function getBillDetails(query){
            return api.getBillDetails({q:query}).$promise;
        }
    }
})();