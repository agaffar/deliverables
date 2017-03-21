/**
 * Created by SB004 on 3/21/2017.
 */
(function(){
    angular.module('buyProd').config(navConfig);
    navConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function navConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
        //console.log("uuuuuuuuuuu");
        $stateProvider.state('home', {
            url:"/home",
            controller: 'homeController',
            controllerAs: 'hc',
            templateUrl: '/partials/homePage.html'

        });
        $stateProvider.state('billDetails', {
            url:"/billDetails:billId",
            controller: 'billDetailsController',
            controllerAs: 'bd',
            templateUrl: '/partials/billDetails.html'

        });
        $urlRouterProvider.otherwise('home');
        //$locationProvider.html5Mode(true);
    }
})();

