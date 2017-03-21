/**
 * Created by SB004 on 3/21/2017.
 */
(function(){
    'use strict'
    angular.module('buyProd.billDetails').controller('billDetailsController',billDetailsController);
    billDetailsController.$inject  = ['$stateParams','homeFactory'];
        function billDetailsController($stateParams,homeFactory){
            var vm = this;
            var billId = $stateParams.billId;
            getBillDetails(billId);
        function getBillDetails(billId){
            var query = {
                "billId" : billId
            };
                console.log(query);
            homeFactory.getBillDetails(query).then(function(response){
                if(response.status == "ok"){
                    var details = response.data;
                    vm.totalProducts = details.items.length;
                    vm.total = details.total;
                    vm.purchasedBy = details.purchasedBy;
                }
            },
            function(data){

            });
        }
    }
})();