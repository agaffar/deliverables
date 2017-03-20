/**
 * Created by SB004 on 3/20/2017.
 */
(function(){
    angular.module('sumCamp').config(navConfig);
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
        $stateProvider.state('addCourse', {
            url:"/addCourse",
            controller: 'addCourseController',
            controllerAs: 'acc',
            templateUrl: '/partials/addCourse.html'

        });
        $stateProvider.state('enrollStudent', {
            url:"/enrollStudent/:courseId",
            controller: 'enrollController',
            controllerAs: 'ec',
            templateUrl: '/partials/enrollStudent.html'

        });
        $urlRouterProvider.otherwise('home');
        //$locationProvider.html5Mode(true);
    }
})();

