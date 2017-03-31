/**
 * Created by SB004 on 3/30/2017.
 */
describe('searchMe', function () {

    var $controller;
    var homeFactory;
    var $q;
    var responseObject = [{
        "_id":"58da715c8c7ee412e4d4f33b",
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
    beforeEach(inject(function(_$controller_,_homeFactory_,_$q_){
        $controller = _$controller_;
        homeFactory = _homeFactory_;
        $q = _$q_;

    }));

    beforeEach(function() {
        spyOn(homeFactory, 'getSearchedData').and.callFake(function (query) {
            /*Server returns promise object*/
            console.log("in home before defer()")
            var defer = $q.defer();
            defer.resolve(responseObject);
            console.log("in home after defer()")
            return defer.promise;
        });
    });
    describe('loadTable', function () {
        var $scope = {};
        it('initialize table params', function () {
            var $scope = {};
            var controller = $controller('homeController', { $scope: $scope });
            var user = {};
            console.log(controller.data)
            //controller.tableParams.reload();
            controller.submitForm(user);

            expect(controller.data.length).toBe(7);
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
            var controller = $controller('homeController', { $scope: $scope });

            controller.tableParams.reload();
            var result = controller.submitForm(user);

            expect(controller.data).toBe(responseObject);
        });
    });

});