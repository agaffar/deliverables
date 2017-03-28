/**
 * Created by SB004 on 3/20/2017.
 */
(function(){
    angular.module('searchMe').config(navConfig);
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

        $urlRouterProvider.otherwise('home');
        //$locationProvider.html5Mode(true);
    }
})();

