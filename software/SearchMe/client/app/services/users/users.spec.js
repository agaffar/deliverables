/**
 * Created by SB004 on 3/30/2017.
 */
describe('searchMe', function () {

    var $controller;
    var homeFactory;
    var homeController;
    var $scope,$rootScope;
    var $q;
    var NgTableParams,$filter;
    var responseObject = {
        "status":"ok",
        "data":[
            {
                "_id":"58da715c8c7ee412e4d4f33b",
                "data":
                    [
                        {"addr": {
                            "_id":"58da715b8c7ee412e4d4f32f",
                            "street":"kukatpally",
                            "houseNo":"1109",
                            "city":"Hyderabad",
                            "state":"Telangana",
                            "__v":0
                        }
                        },{
                        "addr":{
                            "_id":"58da715b8c7ee412e4d4f330",
                            "street":"paraspet",
                            "houseNo":"593/21-2",
                            "city":"Machilipatnam",
                            "state":"Andhra Pradesh",
                            "__v":0}}],
                "users":{
                    "_id":"58da715c8c7ee412e4d4f33b",
                    "firstName":"Abdul",
                    "lastName":"Gaffar",
                    "dateOfBirth":"1994-04-18T18:30:00.000Z"
                }}],
        "message":"successfully data received",
        "pagination":{"total":1}
    };
    var outputObject = [{
        "firstName":"Abdul",
        "lastName":"Gaffar",
        "dateOfBirth":"1994-04-18T18:30:00.000Z",
        "addresses":[
            {

                "_id":"58da715b8c7ee412e4d4f32f",
                "street":"kukatpally",
                "houseNo":"1109",
                "city":"Hyderabad",
                "state":"Telangana",
                "__v":0

            },
            {
                "_id":"58da715b8c7ee412e4d4f330",
                "street":"paraspet",
                "houseNo":"593/21-2",
                "city":"Machilipatnam",
                "state":"Andhra Pradesh",
                "__v":0
            }
        ],

    }];

    beforeEach(function(){
        console.log("each module");
        module('searchMe');
        module('searchMe.home');

    });
    beforeEach(inject(function(_$controller_,_$rootScope_,_$q_,_homeFactory_,_NgTableParams_,_$filter_){
        $controller = _$controller_;
        homeFactory = _homeFactory_;
        $q = _$q_;
        $rootScope =_$rootScope_
        $scope = $rootScope.$new();
        NgTableParams = _NgTableParams_;
        $filter = _$filter_;

    }));

    beforeEach(function() {
        spyOn(homeFactory, 'getSearchedData').and.callFake(function (query) {
            /*Server returns promise object*/
            /* console.log(query);
             console.log("in home before defer()")
             var defer = $q.defer();
             defer.resolve(responseObject);
             console.log("in home after defer()")
             console.log(defer.promise.$$state);
             return defer.promise;*/
            return {
                then: function(callback) {return callback(responseObject);}
            };
        });
        homeController = $controller('homeController', {$scope:$scope,$q:$q, homeFactory:homeFactory,
            NgTableParams: NgTableParams,$filter : $filter})

    });
    describe('loadTable', function () {
        var $scope = {};
        it('initialize table params', function () {
            var $scope = {};
            var controller = $controller('homeController', {$scope:$scope,$q:$q, homeFactory:homeFactory,
                NgTableParams: NgTableParams,$filter : $filter});
            var user = {};
            console.log(controller.data);
            controller.submitForm(user);
            expect(controller.data.length).toBe(1);
        });
    });

    describe('submitForm', function () {
        var user = {
            "firstName" : "abdul"
        };
        user.pagination = {};
        user.pagination.numberToSkip = 0;
        user.pagination.limito = 2;
        it('given input abdul', function () {
            var $scope = {};
            var controller = $controller('homeController', {$scope:$scope,$q:$q, homeFactory:homeFactory,
                NgTableParams: NgTableParams,$filter : $filter});


            var result = controller.submitForm(user);
            console.log("controller.data");
            console.log(controller.data);
            console.log("outputObject");
            console.log(outputObject);
            expect(JSON.stringify(controller.data)).toBe(JSON.stringify(outputObject));
        });
    });

});