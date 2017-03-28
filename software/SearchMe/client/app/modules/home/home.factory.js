/**
 * Created by SB004 on 3/28/2017.
 */
(function () {
'use strict'
    angular.module('searchMe.home').factory("homeFactory",homeFactory);
    homeFactory.$inject = ['api'];
    function homeFactory(api){
        var homeFactoryServices = {
            getSearchedData : getSearchedData
        }
        return homeFactoryServices;
        function getSearchedData(query){
            return api.getDataSearched({q:query}).$promise;
        }
    }
})();